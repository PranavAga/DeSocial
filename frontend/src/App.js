import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SocialMedia from './abis/SocialMedia.json';
import { CONTRACT_ADDRESS } from './utils/constants';
import './App.css';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Sidebar from './components/Sidebar';
import FollowList from './components/FollowList';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [socialMediaContract, setSocialMediaContract] = useState(null);
  const [posts, setPosts] = useState([]);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0]);
        initializeContract();
      } else {
        console.log('No authorized account found');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const initializeContract = async () => {
    if (currentAccount) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SocialMedia.abi,
        signer
      );
      setSocialMediaContract(contract);
    }
  };

  const loadPosts = async () => {
    if (socialMediaContract) {
      const postsArray = await socialMediaContract.getPosts();
      setPosts(postsArray);
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  useEffect(() => {
    initializeContract();
  }, [currentAccount]);

  useEffect(() => {
    loadPosts();
  }, [socialMediaContract]);

  const handlePostCreated = () => {
    loadPosts();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>DeSo</h1>
      </header>
      {!currentAccount && (
        <button className="connect-button" onClick={checkWalletIsConnected}>
          Connect Wallet
        </button>
      )}
      {currentAccount && (
        <div className="app-container">
          <Sidebar currentAccount={currentAccount} />
          <div className="main-content">
            <CreatePost
              socialMediaContract={socialMediaContract}
              onPostCreated={handlePostCreated}
            />
            {posts.map((post) => (
              <Post
                key={post.id.toString()}
                post={post}
                socialMediaContract={socialMediaContract}
                currentAccount={currentAccount}
              />
            ))}
          </div>
          <FollowList
            socialMediaContract={socialMediaContract}
            currentAccount={currentAccount}
          />
        </div>
      )}
    </div>
  );
}

export default App;
