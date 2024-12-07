import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/login',);
          setMessage(response.data.message);
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
                <p className="item">
                    <input type="submit" value="Login" />
                </p>
            </form>
            {message && <p>{"Invalid login credentials. Please try again."}</p>}
        </div>
    )
}

export default Login;
