// import logo from '../src/assets/icon.png'
// import Banner from './components/Banner'
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';
import Home from './components/Home';
import Forum from './components/Forum';
import PostDetails from './components/PostDetails';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on component mount
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
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};


export default App;
