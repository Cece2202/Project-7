import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios for API requests
import API from "../api";
import "../styles/Forum.css"; // Import the CSS file

console.log(API);

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token for authentication
        }
      })
      setPosts(response.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const post = { title, content }; // Combine title and content into one object
    let formData = null;

    if (media) {
      // If media is present, use FormData
      formData = new FormData();
      formData.append("post", JSON.stringify(post));
      formData.append("media", media);
    }
    // Send a POST request to the backend to create a new post
    await axios.post('http://localhost:3000/api/posts', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is set
        'Content-Type': 'multipart/form-data',
      },
    });

    setTitle("");
    setContent("");
    setMedia(null);
    fetchPosts();
    // } catch(err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="forum-container">
      <h2>Forum</h2>
      <form onSubmit={handleCreatePost} className="post-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
        />
        <button type="submit">Create Post</button>
      </form>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <small>By: {post.user?.name}</small>
            <p>{post.content}</p>
            {post.mediaUrl && <img src={post.mediaUrl} alt="Post media" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;
