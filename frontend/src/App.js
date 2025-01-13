import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';
import Home from './components/Home';
import Forum from './components/Forum';
import PostDetails from './components/PostDetails';
import ProtectedRoute from "./components/ProtectedRoutes";
import Profile from './components/Profile';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Check login state on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Remove user ID
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Home /> : <Navigate to="/login" />
        } />
        <Route path="/forum" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Forum />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/posts/:postId" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PostDetails />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          isLoggedIn ? <Navigate to="/" /> : <Signup />
        } />
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/" /> : <Login />
        } />
      </Routes>
    </Router>
  );
};


export default App;
