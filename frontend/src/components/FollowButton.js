import React, { useState, useEffect } from "react";

function FollowButton({ currentAccount, socialMediaContract }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userToFollow, setUserToFollow] = useState("");

  const checkIfFollowing = async () => {
    if (!userToFollow) return;

    try {
      const following = await socialMediaContract.isFollowing(
        currentAccount,
        userToFollow
      );
      setIsFollowing(following);
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const handleFollowUnfollow = async () => {
    if (!userToFollow) return;

    try {
      if (isFollowing) {
        const tx = await socialMediaContract.unfollowUser(userToFollow);
        await tx.wait();
        setIsFollowing(false);
      } else {
        const tx = await socialMediaContract.followUser(userToFollow);
        await tx.wait();
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  useEffect(() => {
    checkIfFollowing();
  }, [userToFollow]);

  return (
    <div>
      <input
        type="text"
        value={userToFollow}
        onChange={(e) => setUserToFollow(e.target.value)}
        placeholder="Enter user address to follow"
      />
      <button onClick={handleFollowUnfollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default FollowButton;
