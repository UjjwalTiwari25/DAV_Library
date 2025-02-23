import React from 'react'

const Navbar = () => {
    return (
      <nav className="bg-site-gray/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-site-blue to-site-purple bg-clip-text text-transparent">
              DAV Public School Library
            </h1>
          </div>
          <div className="flex space-x-4">
            
            <button className="px-4 py-2 rounded-lg bg-site-gray hover:bg-gray-700 transition-colors">
              Home
            </button>
            <button className="px-4 py-2 rounded-lg bg-site-gray hover:bg-gray-700 transition-colors">
              About Us
            </button>
            <button className="px-4 py-2 rounded-lg bg-site-gray hover:bg-gray-700 transition-colors">
              All Books
            </button>
            <button className="px-4 py-2 rounded-lg bg-site-blue hover:bg-blue-600 transition-colors">
              Log In
            </button>
            <button className="px-4 py-2 rounded-lg bg-site-blue hover:bg-blue-600 transition-colors">
              Sign Up
            </button>

          </div>
        </div>
      </nav>
    )
  }

export default Navbar
