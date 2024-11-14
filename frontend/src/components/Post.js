import React, { useState, useEffect } from 'react';
import Donate from './Donate';
import CommentSection from './CommentSection';

function Post({ post, socialMediaContract, currentAccount }) {
  const [promoted, setPromoted] = useState(false);
  const [demoted, setDemoted] = useState(false);
  const [reputation, setReputation] = useState(post.reputation.toNumber());

  const checkPromotionStatus = async () => {
    try {
      const hasPromoted = await socialMediaContract.promotedPosts(
        post.id,
        currentAccount
      );
      const hasDemoted = await socialMediaContract.demotedPosts(
        post.id,
        currentAccount
      );
      setPromoted(hasPromoted);
      setDemoted(hasDemoted);
    } catch (error) {
      console.error('Error checking promotion status:', error);
    }
  };

  const handlePromote = async () => {
    try {
      const tx = await socialMediaContract.promotePost(post.id);
      await tx.wait();
      setPromoted(true);
      setReputation(reputation + 1);
    } catch (error) {
      console.error('Error promoting post:', error);
      alert('Failed to promote post');
    }
  };

  const handleDemote = async () => {
    try {
      const tx = await socialMediaContract.demotePost(post.id);
      await tx.wait();
      setDemoted(true);
      setReputation(reputation - 1);
    } catch (error) {
      console.error('Error demoting post:', error);
      alert('Failed to demote post');
    }
  };

  useEffect(() => {
    checkPromotionStatus();
  }, []);

  return (
    <div className="post">
      <p><strong>{post.author}</strong></p>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="post-actions">
        <button onClick={handlePromote} disabled={promoted || demoted}>
          {promoted ? 'Promoted' : 'Promote'}
        </button>
        <button onClick={handleDemote} disabled={promoted || demoted}>
          {demoted ? 'Demoted' : 'Demote'}
        </button>
        <span>Reputation: {reputation}</span>
      </div>
      <Donate
        socialMediaContract={socialMediaContract}
        postId={post.id}
        postAuthor={post.author}
        currentAccount={currentAccount}
      />
      <CommentSection
        postId={post.id}
        socialMediaContract={socialMediaContract}
        currentAccount={currentAccount}
      />
    </div>
  );
}

export default Post;
