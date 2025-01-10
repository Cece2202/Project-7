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
      try {
        const token = localStorage.getItem('token');
        console.log(token)

        const response = await axios.get(`http://localhost:3000/api/posts/${postId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setPost(response.data);

        // Mark the post as read
        await axios.post(
          `http://localhost:3000/api/posts/${postId}/read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        setPost(response.data);
      } catch (err) {
        setError("Failed to load post details. Please try again.");
      }
    };

    fetchPostDetails();
  }, [postId]);

  const renderMedia = (mediaUrl) => {
    if (!mediaUrl) return null;

    const fileExtension = mediaUrl.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      return <img src={mediaUrl} alt={post.title} />;
    } else if (["mp4"].includes(fileExtension)) {
      return <video src={mediaUrl} controls />;
    } else if (["mp3"].includes(fileExtension)) {
      return <audio src={mediaUrl} controls />;
    } else {
      return null;
    }
  };
  //TODO update display of media for video and audio
  return (
    <div className="post-details-container">
      {error && <p className="error-message">{error}</p>}
      {post && (
        <div className="post-details">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          {renderMedia(post.mediaUrl)}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
