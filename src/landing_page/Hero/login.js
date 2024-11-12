import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email, password });
      document.cookie = `session_id=${response.data.session_id}`;  // Store session_id in cookies
      onLogin();  // Notify parent component that the user is logged in
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='loginPage'>
      <h1>Log In</h1>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="Login_email"
          placeholder="johndoe@mail.com"
        />
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="Login_password"
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
