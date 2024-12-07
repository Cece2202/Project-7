import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Signup.css";

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState();

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signup',);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{"Signup failed. Please try again"}</p>}
    </div>
  );
};

export default Signup;
