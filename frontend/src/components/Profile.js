import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Profile = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await API.delete(`http://localhost:3000/api/auth/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/signup");
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <button onClick={handleDeleteAccount} className="btn btn-danger">
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
