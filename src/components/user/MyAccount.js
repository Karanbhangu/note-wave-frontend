// MyAccount.js

import React, { useEffect, useState, useContext } from "react";
import "../css/MyAccount.css"; // Import your CSS file
import NoteContext from "../../context/Notes/NoteContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyAccount = () => {
  const context = useContext(NoteContext);
  const navigator = useNavigate();
  const { getUser, user, updateUserDetails } = context;
  const [name, setName] = useState(user.name || ""); // Use an empty string as a default
  const [email, setEmail] = useState(user.email || ""); // Use an empty string as a default
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [jwt, setjwt] = useState("");


  useEffect(() => {
    getUser(Cookies.get("jwt"));
  }, []);
  useEffect(() => {
    const findJwt = Cookies.get("jwt");
    if (findJwt) {
      setjwt(findJwt);
    } else {
      notify("Login before accessing account info.");
      navigator("/login");
    }
  }, []);
  useEffect(() => {
    if (user.name !== undefined) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const notify = (message) => {
    toast(message);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle the editing mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUserDetails(Cookies.get("jwt"), name, email, password);
    notify("Details updates successfulMy Accountly.")
    setIsEditing(false);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("jwt");
    notify("Logged out successfully.")
    navigator("/");
  };
  return (
    <div className="my-account-container">
      <div className="account-card">
        <div className="card-header">
          <h3>Your Information</h3>
          <button
            className="edit-button"
            onClick={handleEditToggle}
            disabled={isEditing}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              disabled={!isEditing} // Disable input when not in editing mode
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Enter your new password"
              value={password}
              onChange={handlePasswordChange}
              disabled={!isEditing}
            />
          </div>
          {isEditing && <button className="update-button" disabled={name.length < 4 || email.length < 5}>Update</button>}
          <button
            onClick={handleLogout}
            className="update-button"
            style={isEditing ? { marginLeft: "10px" } : { marginLeft: "0px" }}
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
