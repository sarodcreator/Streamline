import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Homepage/Movies/movies';
import Landing from './landing_page/app';
import Signup from './landing_page/Hero/signup';
import './App.css';

const App = () => {
  const [isGuest, setIsGuest] = useState(false);

  const handleGuestAccess = () => {
    setIsGuest(true); // Allow guest access
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route 
          path="/movies" 
          element={isGuest ? <Home /> : <Navigate to="/signup" />} 
        />
        <Route 
          path="/signup" 
          element={<Signup onGuestAccess={handleGuestAccess} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
