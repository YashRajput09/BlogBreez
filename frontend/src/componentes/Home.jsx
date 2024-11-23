import React from 'react';
import HeroSection from '../home/HeroSection.jsx';
import Hero from '../home/Hero.jsx';
import Trending from '../home/Trending.jsx';
import Devotaional from '../home/Devotional.jsx';
import PopularCreators from '../home/PopularCreators.jsx';
const Home = () => {
  
  return (
    <div>
      <HeroSection/>
      <Hero />
      <Trending />
      <Devotaional />
      <PopularCreators />
    </div>
  )
}

export default Home