import React, { useState, useEffect } from "react";
import FollowButton from "./FollowButton";

function Profile({ currentAccount, socialMediaContract }) {
  const [followers, setFollowers] = useState(0);

  const loadFollowers = async () => {
    // Implement if tracking followers
  };

  useEffect(() => {
    loadFollowers();
  }, []);

  return (
    <div>
      <h2>Your Profile</h2>
      <p>
        <strong>Address:</strong> {currentAccount}
      </p>
      <p>
        <strong>Followers:</strong> {followers}
      </p>
      <FollowButton
        currentAccount={currentAccount}
        socialMediaContract={socialMediaContract}
      />
    </div>
  );
}

export default Profile;
