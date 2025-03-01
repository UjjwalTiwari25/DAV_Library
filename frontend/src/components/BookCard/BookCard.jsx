import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BookCard = ({ data }) => {
  if (!data) return <p>No book data available</p>;

  // Ensure we're using the correct boolean value
  const isAvailable = Boolean(data.available);

  return (
    <Link to={`/view-book-description/${data._id}`} className="block"> {/* Use template literals for dynamic ID */}
      <div className="relative group w-full">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative bg-gray-800 rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700/50 backdrop-blur-xl hover:border-gray-700 transition-all duration-300">
          {/* Book Cover Image */}
          <img
            src={data?.url || "https://via.placeholder.com/200x300"}
            alt={data?.title || "Book Cover"}
            className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-md sm:rounded-lg group-hover:scale-105 transition-transform duration-500"
          />

          {/* Book Details */}
          <div className="mt-3 sm:mt-4 text-center">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors duration-300">
              {data?.title || "Untitled"}
            </h3>
            <p className="text-xs sm:text-sm md:text-md text-gray-400 mt-1">
              by {data?.author || "Unknown"}
            </p>

            {/* Availability Status */}
            <div className={`mt-2 inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
              isAvailable 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
            }`}>
              <span className="font-semibold">
                {isAvailable ? '✓ Available' : '✕ Unavailable'}
              </span>
            </div>
          </div>

          {/* View Details Button */}
          <div className="flex justify-center mt-2 sm:mt-4">
            <button className="p-1 sm:p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors duration-200 text-xs sm:text-sm md:text-base">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;