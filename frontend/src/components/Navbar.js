import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Add this line to import the CSS file
import logo from "../assets/icon.png";


const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Force page reload
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo and Brand */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="9Gang Logo" className="navbar-logo" />
          <span className="brand-text">Groupomania</span>
        </Link>
        <div className="navbar-nav">
          {isLoggedIn ? (
            <>
              <li><button onClick={() => navigate("/")}>HOME</button></li>
              <li><button onClick={() => navigate("/profile")}>PROFILE</button></li>
              <li><button onClick={handleLogout}>LOGOUT</button></li>
            </>
          ) : (
            <>
              <li><button onClick={() => navigate("/signup")}>SIGNUP</button></li>
              <li><button onClick={() => navigate("/login")}>LOGIN</button></li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;