import React from 'react';
import './App.css';
import Trend from './landing_page/Trending_list/trend'
import Content from './landing_page/Content/content';
import Hero from './landing_page/Hero/nav';
import Faq from './landing_page/FAQ/faq';
import Footer from './landing_page/Footer/footer';
//import Home from './Homepage/Movies/movies';

const App = () => {
  return (
    <>
      <Hero />
      <Content />
      <Trend />
      <Faq />
      <Footer />
    </>
  )
};

export default App;