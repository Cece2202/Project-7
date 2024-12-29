import React, { useState, useEffect } from "react";
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
      const { data } = await API.get("http://localhost:3000/posts");
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (media) formData.append("media", media);

    try {
      await API.post("http://localhost:3000/posts", { content });
      setTitle("");
      setContent("");
      setMedia(null);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
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
            <p>{post.content}</p>
            {post.mediaUrl && <img src={post.mediaUrl} alt="Post media" />}
            <small>By: {post.user?.name}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
