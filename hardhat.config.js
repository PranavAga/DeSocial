require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers'); // Ensure this is included

const SEPOLIA_RPC_URL = 'YOUR ALCHEMY URL';
const PRIVATE_KEY = 'YOUR SEPOLIA WALLET PRIVATE KEY'; // Your MetaMask account private key

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
