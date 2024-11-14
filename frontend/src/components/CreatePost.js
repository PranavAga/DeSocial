import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost({ socialMediaContract, onPostCreated }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;

    try {
      const tx = await socialMediaContract.createPost(content);
      await tx.wait();
      setContent('');
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
