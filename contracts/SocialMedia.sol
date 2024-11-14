// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMedia {
    uint256 public postCount = 0;
    uint256 public commentCount = 0;

    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        int256 reputation;
    }

    struct Comment {
        uint256 id;
        uint256 postId;
        address commenter;
        string content;
        uint256 timestamp;
    }

    mapping(uint256 => Post) public posts;
    mapping(uint256 => mapping(address => bool)) public promotedPosts;
    mapping(uint256 => mapping(address => bool)) public demotedPosts;
    mapping(address => address[]) public followers;
    mapping(address => address[]) public following;

    mapping(uint256 => Comment[]) public postComments;

    event PostCreated(
        uint256 id,
        address indexed author,
        string content,
        uint256 timestamp
    );

    event PostPromoted(uint256 id, address indexed promoter);
    event PostDemoted(uint256 id, address indexed demoter);
    event Followed(address indexed follower, address indexed followed);
    event CommentAdded(uint256 indexed postId, uint256 commentId, address commenter);
    event Donation(address indexed from, address indexed to, uint256 amount);

    // Create a new post
    function createPost(string memory _content) public {
        require(bytes(_content).length > 0, "Content cannot be empty");
        postCount++;
        posts[postCount] = Post(
            postCount,
            msg.sender,
            _content,
            block.timestamp,
            0
        );
        emit PostCreated(postCount, msg.sender, _content, block.timestamp);
    }

    // Promote a post
    function promotePost(uint256 _id) public {
        require(_id > 0 && _id <= postCount, "Post does not exist");
        require(
            !promotedPosts[_id][msg.sender],
            "You have already promoted this post"
        );
        require(
            !demotedPosts[_id][msg.sender],
            "You have already demoted this post"
        );
        posts[_id].reputation++;
        promotedPosts[_id][msg.sender] = true;
        emit PostPromoted(_id, msg.sender);
    }

    // Demote a post
    function demotePost(uint256 _id) public {
        require(_id > 0 && _id <= postCount, "Post does not exist");
        require(
            !demotedPosts[_id][msg.sender],
            "You have already demoted this post"
        );
        require(
            !promotedPosts[_id][msg.sender],
            "You have already promoted this post"
        );
        posts[_id].reputation--;
        demotedPosts[_id][msg.sender] = true;
        emit PostDemoted(_id, msg.sender);
    }

    // Follow a user
    function followUser(address _user) public {
        require(_user != msg.sender, "You cannot follow yourself");
        address[] storage userFollowing = following[msg.sender];
        for (uint256 i = 0; i < userFollowing.length; i++) {
            if (userFollowing[i] == _user) {
                revert("Already following this user");
            }
        }
        following[msg.sender].push(_user);
        followers[_user].push(msg.sender);
        emit Followed(msg.sender, _user);
    }

    // Get users the user is following
    function getFollowing(address _user)
        public
        view
        returns (address[] memory)
    {
        return following[_user];
    }

    // Get all posts (latest to oldest)
    function getPosts() public view returns (Post[] memory) {
        Post[] memory _posts = new Post[](postCount);
        uint256 index = 0;
        for (uint256 i = postCount; i >= 1; i--) {
            _posts[index] = posts[i];
            index++;
            if (i == 1) break;
        }
        return _posts;
    }

    // Add Comment to a Post
    function addComment(uint256 _postId, string memory _content) public {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        require(bytes(_content).length > 0, "Content cannot be empty");

        commentCount++;
        Comment memory newComment = Comment({
            id: commentCount,
            postId: _postId,
            commenter: msg.sender,
            content: _content,
            timestamp: block.timestamp
        });

        postComments[_postId].push(newComment);
        emit CommentAdded(_postId, commentCount, msg.sender);
    }

    // Get Comments for a Post
    function getComments(uint256 _postId) public view returns (Comment[] memory) {
        return postComments[_postId];
    }

    // Donate to a post's author
    function donate(uint256 _id) public payable {
        require(_id > 0 && _id <= postCount, "Post does not exist");
        require(msg.value > 0, "Donation must be greater than 0");
        address payable recipient = payable(posts[_id].author);
        recipient.transfer(msg.value);
        emit Donation(msg.sender, recipient, msg.value);
    }
}
