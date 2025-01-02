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
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleForum = () => {
    navigate("/forum");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">9Gang</Link>
        <div className="navbar-nav">
          {isLoggedIn ? (
            <>
              <li><button onClick={handleHome}>Home</button></li>
              <li><button onClick={handleLogout}>Logout</button></li>
              <li><button onClick={handleForum}>Forum</button></li>
            </>
          ) : (
            <>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
