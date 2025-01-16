import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load user data");
                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate("/login");
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleDeleteAccount = async () => {
      if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          return;
      }
  
      try {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
          
          await axios.delete(`http://localhost:3000/api/auth/${userId}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
  
          localStorage.clear();
          window.location.href = '/signup'; // Force reload and redirect
      } catch (err) {
          setError("Failed to delete account");
      }
    };

    if (!userData) {
        return <div className="profile-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-header">Your Profile</h1>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="profile-info">
                <div className="profile-field">
                    <div className="profile-label">Name</div>
                    <div className="profile-value">{userData.name}</div>
                </div>
                
                <div className="profile-field">
                    <div className="profile-label">Email</div>
                    <div className="profile-value">{userData.email}</div>
                </div>
            </div>

            <button 
                onClick={handleDeleteAccount} 
                className="delete-button"
            >
                Delete Account
            </button>
        </div>
    );
}

export default Profile;