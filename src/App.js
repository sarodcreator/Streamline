import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Homepage/Movies/movies';
import Landing from './landing_page/app';
import Signup from './landing_page/Hero/signup';
import Login from './landing_page/Hero/login';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </Router>
  );
};

export default App;
