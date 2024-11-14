import React from 'react';

function Sidebar({ currentAccount }) {
  return (
    <div className="sidebar">
      <h2>User Details</h2>
      <p><strong>Address:</strong></p>
      <p>{currentAccount}</p>
    </div>
  );
}

export default Sidebar;
