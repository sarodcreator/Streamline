import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

const Signup = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/signup', { userName, email, password });
      alert('User created successfully');
      onClose();  // Close the sign-up form after successful signup
    } catch (error) {
      alert('Error creating user');
    }
  };

  return (
    <div className="signupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
        <label htmlFor="userName">Username:</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          id="userName"
          placeholder="Enter username"
        />
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Enter email"
        />
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="Enter password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
