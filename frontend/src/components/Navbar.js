import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Add this line to import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Remove user ID
    navigate("/login");
  };

  const handleHome = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleForum = () => {
    setIsLoggedIn(false);
    navigate("/forum");
  };

  const handleProfile = () => {
    setIsLoggedIn(false);
    navigate("/profile");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">9Gang</Link>
        <div className="navbar-nav">
          {isLoggedIn ? (
            <>
              <li><button onClick={handleHome}>Home</button></li>
              <li><button onClick={handleForum}>Forum</button></li>
              <li><button onClick={handleProfile}>Profile</button></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><button onClick={handleSignup}>Signup</button></li>
              <li><button onClick={handleLogin}>Login</button></li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
