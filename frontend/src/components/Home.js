import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      fetchTrendingPosts();
    }, []);
  
    const fetchTrendingPosts = async () => {
      try {
        // Fetch trending posts from the backend
        const { data } = await API.get("/posts/trending");
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
  
    return (
      <div className="home-container">
        <header className="home-header">
          <h1>Welcome to 9Gang</h1>
          <p>The fun place for your team! Share, laugh, and connect.</p>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </header>
        
        <section className="trending-posts">
          <h2>Trending Posts</h2>
          <div className="posts-grid">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="post-card">
                  {post.media && <img src={post.media} alt="Post" className="post-image" />}
                  <p className="post-content">{post.content}</p>
                  <small className="post-author">By: {post.user?.name}</small>
                </div>
              ))
            ) : (
              <p>No posts yet. Be the first to share something!</p>
            )}
          </div>
        </section>
      </div>
    );
  };
  
  export default Home;
  