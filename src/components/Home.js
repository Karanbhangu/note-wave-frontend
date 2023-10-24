import React from "react";
import "./css/Home.css"; // Import your CSS file for the homepage
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    <div className="home-container">
      <div className="intro-section">
        <h1 className="app-heading">Notewave</h1>
        <p className="app-tagline">Your Personal Note-Taking App</p>
        <div className="action-buttons">
          <Link to="/login" className="login-button">
            Login
          </Link>
          <Link to="/signup" className="signup-button">
            Sign Up
          </Link>
        </div>
      </div>
      </div>
      <h2 className="head">Features of Note-Wave:</h2>
      <div className="features-section">
        
        <div className="feature-card">
          <i className="fas fa-cloud"></i>
          <h2>Free Notes Taking App</h2>
          <p>Save notes on the cloud</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-lock"></i>
          <h2>Fully Secure App</h2>
          <p>Your notes are safe and secure</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-globe"></i>
          <h2>Access Notes Anywhere</h2>
          <p>Retrieve your notes from any device</p>
        </div>
      </div>
      <div className="technologies-section">
  <h2 className="tech-heading">Technologies Used</h2>
  <div className="tech-icons">
    <i className="fab fa-react"></i>
    <i className="fab fa-node"></i>
    <i className="fab fa-js"></i>
    <i className="fas fa-database"></i>
  </div>
  <p className="tech-description">
    Built using the MERN stack (MongoDB, Express.js, React, Node.js).
  </p>
</div>

      </>
  );
};

export default Home;
