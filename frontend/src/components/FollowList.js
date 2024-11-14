import React, { useState, useEffect } from 'react';

function FollowList({ socialMediaContract, currentAccount }) {
  const [following, setFollowing] = useState([]);
  const [userToFollow, setUserToFollow] = useState('');

  const loadFollowing = async () => {
    try {
      const addresses = await socialMediaContract.getFollowing(currentAccount);
      setFollowing(addresses);
    } catch (error) {
      console.error('Error loading following list:', error);
    }
  };

  const handleFollow = async () => {
    if (!userToFollow) return;
    try {
      const tx = await socialMediaContract.followUser(userToFollow);
      await tx.wait();
      setUserToFollow('');
      loadFollowing();
    } catch (error) {
      console.error('Error following user:', error);
      alert('Failed to follow user');
    }
  };

  useEffect(() => {
    loadFollowing();
  }, [socialMediaContract]);

  return (
    <div className="follow-list">
      <h2>Following</h2>
      <ul>
        {following.map((addr, index) => (
          <li key={index}>{addr}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="User address"
        value={userToFollow}
        onChange={(e) => setUserToFollow(e.target.value)}
      />
      <button onClick={handleFollow}>Follow</button>
    </div>
  );
}

export default FollowList;
