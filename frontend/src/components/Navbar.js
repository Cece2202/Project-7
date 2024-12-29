import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Add this line to import the CSS file

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">9Gang</Link>
        <div className="navbar-nav">
        <Link className="nav-link" to="/signup">Signup</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
