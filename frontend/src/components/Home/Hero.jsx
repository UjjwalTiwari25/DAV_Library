import React, { useState, useEffect } from 'react';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TypingText = () => {
  const text = "Explore a world of knowledge with a vast collection of books, from essential study materials to timeless encyclopedias, science fiction, and literary classics—where learning knows no bounds!";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const typingSpeed = 30;
  const restartDelay = 1000;

  useEffect(() => {
    if (index < text.length) {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, restartDelay);
    }
  }, [index]);

  return (
    <motion.p
      className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300 leading-relaxed text-center md:text-left"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {displayedText}|
    </motion.p>
  );
};

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          DAV ISPAT LIBRARY
        </motion.h1>

        {/* Animated Typing Effect Text */}
        <TypingText />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center md:justify-start"
        >
          <Link
            to="/all-books"
            className="inline-block px-6 py-3 mt-6 bg-gradient-to-r from-blue-600 to-purple-400 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          >
            Explore Now
          </Link>
        </motion.div>
      </div>

      {/* Right Side - Large Library Icon with Jump Animation */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{
                    y: [0, -12, 0],  // Moves up and down slightly
            scale: [1, 1.1, 1],  // Grows bigger and shrinks back
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <BookOpenIcon
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-lg"
            style={{ fill: 'url(#bookIconGradient)' }}
          />
        </motion.div>


        <svg width="0" height="0">
          <linearGradient id="bookIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />  
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;
