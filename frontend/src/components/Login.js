import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection


function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState();
    const navigate = useNavigate(); // Initialize useNavigate



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

            // Store user info in localStorage
            const { token, userId } = response.data;
            localStorage.setItem("userId", JSON.stringify(userId));
            localStorage.setItem("token", token);

            setMessage(response.data.message);
            navigate("/"); // Redirect to the home page
        } catch (error) {
            setMessage(error.response?.data?.error || 'Invalid login credentials. Please try again.');
        }
    };



    return (
        <div>
            <form action="" id="login" method="post" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <p className="item">
                    <label for="email"> Email </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </p>
                <p className="item">
                    <label for="password"> Password </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </p>
                <button type="submit">Login</button>
            </form>
            {message && <p>{"Invalid login credentials. Please try again."}</p>}
        </div>
    )
}

export default Login;
