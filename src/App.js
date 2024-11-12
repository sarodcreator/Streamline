import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hero from './components/Hero';
import Home from './components/Home';
import Footer from './landing_page/Footer/footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Hero} />
        <Route path="/movies" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
