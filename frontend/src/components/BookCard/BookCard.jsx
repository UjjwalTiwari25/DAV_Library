import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BookCard = ({ data }) => {
  if (!data) return <p>No book data available</p>;

  return (
    <Link to={`/view-book-description/${data._id}`} className="block w-full"> 
      <div className="relative group w-full h-full">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative bg-gray-800 rounded-2xl p-2 sm:p-3 border border-gray-700/50 backdrop-blur-xl hover:border-gray-700 transition-all duration-300 h-full flex flex-col">
          {/* Book Cover Image */}
          <div className="flex-grow flex items-center justify-center">
            <img
              src={data?.url || "https://via.placeholder.com/200x300"}
              alt={data?.title || "Book Cover"}
              className="w-full aspect-[2/3] object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Book Details */}
          <div className="mt-2 text-center">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors duration-300">
              {data?.title || "Untitled"}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">by {data?.author || "Unknown"}</p>

            {/* Availability Status */}
            <div className={`mt-1 inline-block px-2 py-0.5 rounded-full ${
              data.available 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
            }`}>
              <span className="text-xs font-semibold">
                {data.available ? '✓ Available' : '✕ Unavailable'}
              </span>
            </div>
          </div>

          {/* View Details Button */}
          <div className="flex justify-center mt-1">
            <button className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors duration-200 text-xs">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;