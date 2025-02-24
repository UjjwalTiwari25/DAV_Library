import React from 'react';
import Hero from '../components/Home/Hero';

const Home = () => {
  return (
    <div className="bg-zinc-900 text-white min-h-screen flex flex-col">
    <div className="flex-grow">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
