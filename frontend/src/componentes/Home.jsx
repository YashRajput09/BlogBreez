import React from 'react';
import Hero from '../home/Hero.jsx';
import Trending from '../home/Trending.jsx';
import Devotaional from '../home/Devotional.jsx';
import Creators from '../home/Creators.jsx';

const Home = () => {
  
  return (
    <div>
      <Hero />
      <Trending />
      <Devotaional />
      <Creators />
    </div>
  )
}

export default Home