import React, { useState } from "react";
import "../css/Login.css"; // Import your CSS files
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the library
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [jwt, setJwt] = useState(""); // State to store the JWT
  const notify = (message) => {
    toast(message);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    // Create an object to send as the request body
    const loginData = {
      email: email,
      password: password,
    };

    const loginUser = await fetch(`https://notewave-backend.onrender.com/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Use "Content-Type" with a capital 'C'
      },
      body: JSON.stringify(loginData), // Convert the object to JSON
    });
    if(loginUser.ok){
      const userVerify = await loginUser.json();
      const token = userVerify.token;
      setJwt(token)

      // Storing jwt in token:
      Cookies.set("jwt", token, {expires: 7})
      notify(`Logged-in. Welcome back ${userVerify.name}`)
      navigate('/notes')
    }
    else{
      notify("Invalid credentials. Try again!")
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="label">Email:</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter your email"
              onChange={handleEmail}
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="label">Password:</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <p>
            <Link to="/signup">Create a account</Link>
          </p>
          <button
            className="login-button"
            disabled={email.length < 5 || password.length < 5}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
