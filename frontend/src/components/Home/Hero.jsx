import React from 'react';
import HeroImage from '../../assets/Hero.jpeg';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg">
          Discover Your Study Material Here
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Uncover captivating stories and essential study guides to enhance your learning experience.
        </p>
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-400 text-white text-lg font-semibold rounded-lg shadow-lg 
                          hover:scale-105 transition-all duration-300">
          Explore Now
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img src={HeroImage} alt="Study Material" className="w-3/4 md:w-[450px] object-cover drop-shadow-lg" />
      </div>

    </div>
  );
};

export default Hero;
