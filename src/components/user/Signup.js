import React, { useState } from "react";
import "../css/Signup.css"; // Import your CSS file
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = (message) => {
    toast(message);
  };
  const navigate = useNavigate();
  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Create an object to send as the request body
    const registrationData = {
      name: name,
      email: email,
      password: password,
    };

    const registerUser = await fetch(`http://localhost:5000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Use "Content-Type" with a capital 'C'
      },
      body: JSON.stringify(registrationData), // Convert the object to JSON
    });
    if(registerUser.ok){
      const userVerify = await registerUser.json();
      notify("Registration Successful. Login here")
      navigate("/login")
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleRegistration}>
          <div className="form-group">
            <label className="label">Name:</label>
            <input type="text" className="input" placeholder="Enter your name" onChange={handleName}/>
          </div>
          <div className="form-group">
            <label className="label">Email:</label>
            <input type="email" className="input" placeholder="Enter your email" onChange={handleEmail}/>
          </div>
          <div className="form-group">
            <label className="label">Password:</label>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              onChange={handlePassword}
            />
          </div>
          <p><Link to='/login'>Login here</Link></p>
          <button className="signup-button" disabled={name.length < 4 || email.length < 5 || password.length < 6}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
