import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/solid';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4 md:space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight">
          DAV ISPAT LIBRARY
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-300 leading-relaxed">
          Explore a world of knowledge with a vast collection of books, from essential study materials to timeless encyclopedias, science fiction, and literary classics—where learning knows no bounds!
        </p>

        <button className="mt-4 sm:mt-6 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-purple-400 text-white text-lg font-semibold rounded-lg shadow-lg 
                          hover:scale-105 transition-all duration-300">
          Explore Now
        </button>
      </div>

      {/* Right Side - Large Library Icon */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
        <BookOpenIcon className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-lg" 
          style={{ fill: 'url(#bookIconGradient)' }} 
        />
        <svg width="0" height="0">
          <linearGradient id="bookIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />  
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </svg>
      </div>

    </div>
  );
};

export default Hero;
