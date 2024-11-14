import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CommentSection({ postId, socialMediaContract, currentAccount }) {
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState('');

  const loadComments = async () => {
    if (socialMediaContract) {
      const commentsArray = await socialMediaContract.getComments(postId);
      // Sort comments from latest to oldest

      const toReverse = [...commentsArray]

      setComments(toReverse.reverse());
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!content) return;

    try {
      const tx = await socialMediaContract.addComment(postId, content);
      await tx.wait();
      setContent('');
      loadComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!expanded) {
      loadComments();
    }
  };

  useEffect(() => {
    if (expanded) {
      loadComments();
    }
  }, [socialMediaContract]);

  return (
    <div className="comment-section">
      <button onClick={toggleExpand}>
        {expanded ? 'Hide Comments' : 'Show Comments'}
      </button>
      {expanded && (
        <div className="comments-container">
          <form onSubmit={handleAddComment}>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Add a comment..."
            />
            <button type="submit">Comment</button>
          </form>
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div className="comment" key={index}>
                <p><strong>{comment.commenter}</strong></p>
                <div
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                ></div>
                <p className="timestamp">
                  {new Date(comment.timestamp * 1000).toLocaleString()}
                </p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
