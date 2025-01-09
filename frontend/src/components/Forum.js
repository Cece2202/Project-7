import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Forum.css";

const Forum = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const post = { title, content };
    let formData = null;

    if (media) {
      formData = new FormData();
      formData.append("post", JSON.stringify(post));
      formData.append("media", media);
    }

    try {
      await axios.post(
        "http://localhost:3000/api/posts",
        media ? formData : post,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": media ? "multipart/form-data" : "application/json",
          },
        }
      );

      setTitle("");
      setContent("");
      setMedia(null);
      navigate("/"); // Redirect to home after creating the post
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="forum-container">
      <h2>Create a Post</h2>
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
        <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default Forum;
