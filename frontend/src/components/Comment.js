import React, { useState, useEffect } from "react";
import { create } from "ipfs-http-client";

const ipfs = create({ url: "http://localhost:5001/api/v0" });

function Comment({ comment, socialMediaContract, currentAccount }) {
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(comment.likes.toNumber());
  const [liked, setLiked] = useState(false);

  const loadContent = async () => {
    try {
      const chunks = [];
      for await (const chunk of ipfs.cat(comment.contentHash)) {
        chunks.push(chunk);
      }
      const rawContent = Buffer.concat(chunks).toString();
      setContent(rawContent);
    } catch (error) {
      console.error("Error fetching comment content:", error);
    }
  };

  const checkIfLiked = async () => {
    try {
      const hasLiked = await socialMediaContract.likedComments(
        comment.id,
        currentAccount
      );
      setLiked(hasLiked);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLike = async () => {
    try {
      const tx = await socialMediaContract.likeComment(comment.id);
      await tx.wait();
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  useEffect(() => {
    loadContent();
    if (currentAccount) {
      checkIfLiked();
    }
  }, [currentAccount]);

  return (
    <div style={{ marginLeft: "20px" }}>
      <p>
        <strong>{comment.commenter}:</strong> {content}
      </p>
      <p>
        <strong>Likes:</strong> {likes}
      </p>
      <button onClick={handleLike} disabled={liked}>
        {liked ? "Liked" : "Like"}
      </button>
    </div>
  );
}

export default Comment;
