import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });

            // Store user info in localStorage
            const { token, userId } = response.data;
            localStorage.setItem("userId", JSON.stringify(userId));
            localStorage.setItem("token", token);

            setError(response.data.message);
            window.location.assign("/"); 

        } catch (error) {
            setError(error.response?.data?.error || 'Invalid login credentials. Please try again.');
        }
    };



    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;