import React from 'react'

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-white">Manage Your</span>{" "}
          <span className="bg-gradient-to-r from-site-blue to-site-purple bg-clip-text text-transparent">
          books, resources, and more.
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
          DAV Public School Library is your one-stop  solution for your study mate.
          Get instant access to books, resources, and more.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 rounded-lg bg-site-blue hover:bg-blue-600 transition-colors text-lg font-semibold">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-lg bg-site-gray hover:bg-gray-700 transition-colors text-lg font-semibold">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
