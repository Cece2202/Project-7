import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/PostDetails.css";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      const token = localStorage.getItem('token');
      const userId = Number(localStorage.getItem('userId'));

      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPost(response.data);

        if (!response.data.reads?.includes(userId)) {
          await axios.post(`http://localhost:3000/api/posts/${postId}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setPost(prevPost => ({
            ...prevPost,
            reads: [...(prevPost.reads || []), userId]
          }));
        }
      } catch (err) {
        setError("Failed to load post details");
      }
    };

    fetchPostDetails();
  }, [postId]);

  const renderMedia = (mediaUrl) => {
    if (!mediaUrl) return null;

    const fileExtension = mediaUrl.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      return (
        <div className="post-media">
          <img src={mediaUrl} alt={post.title} />
        </div>
      );
    } else if (["mp4"].includes(fileExtension)) {
      return (
        <div className="post-media">
          <video controls>
            <source src={mediaUrl} type={`video/${fileExtension}`} />
            Your browser does not support video playback.
          </video>
        </div>
      );
    } else if (["mp3"].includes(fileExtension)) {
      return (
        <div className="post-media">
          <audio controls>
            <source src={mediaUrl} type={`audio/${fileExtension}`} />
            Your browser does not support audio playback.
          </audio>
        </div>
      );
    }
    return null;
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) {
    return <div className="post-details-container">Loading...</div>;
  }

  return (
    <div className="post-details-container">
      <article className="post-details">
        <h1>{post.title}</h1>
      </article>
      {renderMedia(post.mediaUrl)}
      <article className="post-details">
        <div className="post-content">{post.content}</div>
      </article>
    </div>
  );
};

export default PostDetails;