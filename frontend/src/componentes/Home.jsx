import React from 'react';
import Hero from '../home/Hero.jsx';
import Trending from '../home/Trending.jsx';
import Devotaional from '../home/Devotional.jsx';
import PopularCreators from '../home/PopularCreators.jsx';
import Footer from './Footer.jsx';

const Home = () => {
  
  return (
    <div>
      <Hero />
      <Trending />
      <Devotaional />
      <PopularCreators />
      <Footer/>
    </div>
  )
}

export default Home