import React from "react";
import { Link } from "react-router-dom";
import './css/About.css'; // Import your CSS file

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About This Project</h1>
      <p className="about-description">
        Welcome to the About page of this MERN-based project. This application
        is designed to help you save and manage your notes securely in the
        cloud. It offers various features, including user authentication and
        authorization, MongoDB as the database, and full CRUD (Create, Read,
        Update, Delete) operations for your notes.
      </p>
      <p className="about-description">
        The project showcases the use of APIs, complex state management for
        handling components and animations, and a user-friendly UI with
        intuitive features.
      </p>

      <h2 className="about-subtitle">Features:</h2>
      <ul className="about-list">
        <li>Securely Save and Manage Notes in the Cloud</li>
        <li>User Authentication and Authorization</li>
        <li>Utilizes MongoDB as the Database</li>
        <li>Full CRUD Operations for Notes</li>
        <li>API Integration</li>
        <li>Complex State Management</li>
        <li>Enhanced User Interface with Animations</li>
      </ul>

      <h1 className="about-title">About Me</h1>
      <p className="about-description">
        I'm a self-taught developer with a passion for creating web
        applications. I specialize in the MERN (MongoDB, Express, React, Node.js)
        stack and enjoy building projects that solve real-world problems. You
        can find more of my work and projects on my GitHub account:
      </p>
      <p className="about-link">
        <a
          href="https://github.com/karanbhangu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit my GitHub Profile
        </a>
      </p>
    </div>
  );
};

export default About;
