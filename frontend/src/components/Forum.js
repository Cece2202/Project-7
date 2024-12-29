import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/Forum.css"; // Import the CSS file

console.log(API);

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

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
    try {
      await API.post("/posts", { content });
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="forum-container">
      <h2 className="forum-title">Forum</h2>
      <form onSubmit={handleCreatePost} className="post-form">
        <div className="form-group">
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something..."
            required
          />
        </div>
        <button type="submit" className="btn btn-post">
          Post
        </button>
      </form>
      <div className="post-list mt-4">
        {posts.map((post) => (
          <div key={post._id} className="post-card mb-3">
            <div className="post-card-body">
              <p>{post.content}</p>
              <small>By: {post.user?.name}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
