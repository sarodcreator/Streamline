import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './login';
import './nav.css';
import logonetflix from '../../assets/Logonetflix.png';
import Lang from '../components/dropdowns';
import arrowright from '../../assets/arrow-right.png';

const Hero = () => {
  const [LogInForm, SetLoginForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a session (cookie) on load
    const session = document.cookie.split(';').find(cookie => cookie.trim().startsWith('session_id='));
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignup = () => {
    navigate("/signup")
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="hero">
      {isAuthenticated ? (
        navigate("/movies")
      ) : (
        <div className="box">
          <div className="header">
            <img src={logonetflix} alt="netflix logo" />
            <div className="left">
              <div className='lang_btn'>< Lang /></div>
              <button className='loginbtn' onClick={() => SetLoginForm(true)}>Login</button>
            </div>
          </div>
          <div className="content">
            <h1>Unlimited movies, TV <br />shows, and more</h1>
            <p>Watch for free, Ready to Watch?</p>
            <form action="">
              <input type="email" className='email' placeholder='Email Address'/>
              <button className="registerbtn" type="button" onClick={handleSignup}>Get Started <img src={arrowright} alt="" /></button>
            </form>
          </div>
        </div>
      )}
      {LogInForm && <Login onLogin={handleLogin} />}
    </div>
  );
};

export default Hero;
