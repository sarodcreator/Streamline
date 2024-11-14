import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

const Signup = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/netflix/signup', { user_name: userName,
        email, first_name: firstName, password, last_name: lastName, password_confirm: passwordConfirm });
      if (response.data.success) {
        alert('Your Account has been  created successfully');
        onClose();
      } else {
      alert(response.data.Error);
      }
    } catch (error) {
      console.log(error);
    };
  }


  return (
    <div className="signupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          id="firstName"
          placeholder="Enter your first name..."
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          id="lastName"
          placeholder="Enter your last name..."
        />
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
        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          id="passwordConfirm"
          placeholder="Enter password"
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
