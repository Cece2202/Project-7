// import logo from './logo.svg';
import Banner from './components/Banner'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';

const App = () => {
  return (
    <Router>
      <Banner/>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
