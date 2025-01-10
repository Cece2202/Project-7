import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api";
import "../styles/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const userId = Number(localStorage.getItem("userId"));
  const location = useLocation();

  useEffect(() => {
    fetchTrendingPosts();
  }, [location]);

  const fetchTrendingPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await API.get("http://localhost:3000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
        params: { _: new Date().getTime() }
      });
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const renderMedia = (mediaUrl) => {
    if (!mediaUrl) return null;
    const fileExtension = mediaUrl.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      return (
        <div className="post-media">
          <img src={mediaUrl} alt="" />
        </div>
      );
    } else if (['mp4'].includes(fileExtension)) {
      return (
        <div className="post-media video-container">
          <video controls>
            <source src={mediaUrl} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (['mp3'].includes(fileExtension)) {
      return (
        <div className="post-media audio-container">
          <audio controls>
            <source src={mediaUrl} type={`audio/${fileExtension}`} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    }
    return null;
  };

  const isPostRead = (post) => {
    if (!post.reads) return false;
    return post.reads.includes(Number(userId));
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome</h1>
        <p>The fun place for your team! Share, laugh, and connect.</p>
        <Link to="/forum" className="create-post-btn">Create Post</Link>
      </header>

      <section className="trending-posts">
        <h2>Trending Posts</h2>
        <div className="posts-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="read-status">
                  {isPostRead(post) ? 
                    <span className="status read">✓ Read</span> :
                    <span className="status unread">New</span>
                  }
                </div>
                <h3 className="post-title">{post.title}</h3>
                {renderMedia(post.mediaUrl)}
                <p className="post-content">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>
                <Link to={`/posts/${post.id}`} className="read-more">
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <p className="no-posts">No posts yet. Be the first to share something!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;