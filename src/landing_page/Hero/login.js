import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/netflix/login', { email, password });
      document.cookie = `session_id=${response.data.session_id}`;
      onLogin();
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const handleBypass = () => {
    navigate('/movies');
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
        <button type="submit">Login</button>
      </form>
      <button className="bypass-btn" onClick={handleBypass}>Bypass Login</button>
    </div>
  );
};

export default Login;
