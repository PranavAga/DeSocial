# Decentralized Social Media Platform

This project is an enhanced decentralized social media application that allows users to interact without restrictions, emphasizing community ownership over corporate control. It supports various social media interactions such as promoting/demoting, commenting, and following between multiple users. The platform leverages blockchain technology for decentralization and smart contracts for core functionalities.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [How to Run Locally](#how-to-run-locally)
- [Additional Notes](#additional-notes)

---

## Features

- **Decentralized Architecture**
  - Fully decentralized using blockchain technology.
  - Immutable and transparent data storage.
  - Censorship-resistant platform.
  - All data and interactions are stored directly on the blockchain.

- **User Interface Improvements**
  - **Responsive Design:** The website is fully responsive, adapting to different screen sizes without altering the existing design.

- **Enhanced Color Palette**
  - Interface updated with a soothing color palette featuring **soft blues**, **muted pinks**, and **creamy beige** tones for an improved aesthetic.

- **Smart Contract-based User Interactions**
  - Core social interactions implemented as smart contracts, including:
    - **Posting:** Users can create posts stored directly on-chain.
    - **Promote/Demote Posts:** Users can **promote** or **demote** posts, affecting the post's reputation score.
    - **Reputation System:** Posts have a reputation score calculated based on promotes and demotes.
    - **Comments:** Implemented a comment system with rich-text formatting. Users can add comments to posts, which are stored on-chain.
    - **Donations:** Users can donate ETH to post authors directly through the platform.

- **Persistent Data Storage**
  - All posts, comments, interactions, and following data are stored on the blockchain, ensuring persistence and transparency.

- **Decentralized Identity Management**
  - Enhanced privacy and security.
  - User-controlled authentication using MetaMask.
  - Reduced risk of data breaches.

- **Rich-Text Formatting**
  - Implemented rich-text editor for post creation and comments using `react-quill`.
  - Maintains formatting when displaying posts and comments in the feed.

- **User Interactions**
  - **Follow Users:** Users can follow other users. The following list is stored and retrieved from the blockchain.
  - **Donation Feature:** Users can donate ETH to post authors, with amounts transferred directly to the author's address.

- **Real-Time Interaction Updates**
  - Interface updates automatically when new posts are created or interactions occur.
  - Posts and comments are displayed from latest to oldest.

- **Accessibility and Usability**
  - Intuitive single-page layout with:
    - **Title Bar**: Displays the platform name **"DeSo"**.
    - **Left Sidebar**: Shows user details.
    - **Center Feed**: Post creation interface and feed of existing posts.
    - **Right Sidebar**: Shows the list of users the current user follows.
    - **Comments Section**: Collapsible comment sections for each post, with rich-text input and display.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js and npm**
  - Install Node.js and npm from the [official website](https://nodejs.org/).

- **MetaMask**
  - Install the MetaMask wallet extension in your browser from the [MetaMask website](https://metamask.io/).
  
---

## Dependencies

The project uses the following technologies and libraries:

- **Smart Contract Development**
  - Solidity
  - Hardhat
  - OpenZeppelin Contracts

- **Blockchain Interactions**
  - ethers.js

- **Front-End Development**
  - React.js
  - Create React App

- **User Authentication**
  - MetaMask

- **Other Dependencies**
  - Node.js
  - npm

---

## Project Structure

```
DeSo/
├── contracts/
│   └── SocialMedia.sol         # Solidity smart contract
├── scripts/
│   └── deploy.js               # Deployment script for smart contract
├── hardhat.config.js           # Hardhat configuration
├── package.json                # Root package configuration
├── frontend/
│   ├── public/
│   │   └── index.html          # Entry point for React app
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # CSS styles
│   │   ├── index.js            # Entry point for React app
│   │   ├── components/
│   │   │   ├── CreatePost.js
│   │   │   ├── Post.js
│   │   │   ├── CommentSection.js
│   │   │   ├── Sidebar.js
│   │   │   ├── FollowList.js
│   │   │   └── Donate.js
│   │   ├── abis/
│   │   │   └── SocialMedia.json  # ABI file
│   │   └── utils/
│   │       └── constants.js    # Contract address
│   ├── package.json            # Front-end package configuration
└── README.md                   # Project documentation
```

---

## How to Run Locally

Follow these step-by-step instructions to set up the project on your local machine:

### 1. Configure MetaMask

- **Install MetaMask**: Install the MetaMask browser extension if you haven't already.

- Change the network to Sepolia testnet and select the account which contains Sepolia ETH for testing (get them using faucets)
    
### 2. Install Front-End Dependencies

In the `frontend` directory:

```bash
npm install
```

### 7. Start the React Application

- **Run the Front-End App from the `frontend` directory**:

  ```bash
  npm start
  ```

  - This will start the development server and open the app at `http://localhost:3000`.

### 8. Interact with the Application

- **Access the App**:

  - Navigate to `http://localhost:3000` in your browser.

- **Connect MetaMask**:

  - When prompted, connect your MetaMask wallet to the application.

- **Use Features**:

  - Create new posts.
  - Comment on posts.
  - Promote and Demote posts.
  - Follow other users.
  - Donate to content creators.

## Additional Notes

- **Smart Contract Changes:** If you make changes to your smart contracts:

  - Recompile and redeploy them (you will need Alchemy API and private key for your sepolia wallet to redeploy))
  - Update the ABI in your front-end (`src/abis/SocialMedia.json`).
  - Update the contract address in your front-end code.

- **Hardhat vs. Create React App:** Hardhat is used for compiling and deploying smart contracts, while Create React App sets up your front-end React application.

- **Dependencies:** Ensure all dependencies are installed in the correct directories:

  - Root directory (`decentralized-social-media/`): Dependencies for smart contracts and deployment scripts (only for development).
  - Front-end directory (`frontend/`): Dependencies for the React application.
