import React, { useState } from 'react';
import { ethers } from 'ethers';

function Donate({ socialMediaContract, postId, postAuthor, currentAccount }) {
  const [amount, setAmount] = useState('');

  const handleDonate = async () => {
    if (!amount) return;
    try {
      const tx = await socialMediaContract.donate(postId, {
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      alert('Donation successful!');
      setAmount('');
    } catch (error) {
      console.error('Error making donation:', error);
      alert('Donation failed.');
    }
  };

  return (
    <div className="donate">
      <input
        type="number"
        min="0"
        step="0.0001"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
}

export default Donate;
