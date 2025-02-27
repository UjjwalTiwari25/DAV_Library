import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BookCard = ({ data }) => {
  if (!data) return <p>No book data available</p>;

  // Determine availability status
  const isAvailable = data?.available || false; // Assuming `available` is a boolean in your data

  return (
    <Link to={`/view-book-description/${data._id}`} className="block"> {/* Use template literals for dynamic ID */}
      <div className="relative group w-full">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700/50 backdrop-blur-xl hover:border-gray-700 transition-all duration-300">
          {/* Book Cover Image */}
          <img
            src={data?.url || "https://via.placeholder.com/200x300"}
            alt={data?.title || "Book Cover"}
            className="w-full h-48 sm:h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          />

          {/* Book Details */}
          <div className="mt-4 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors duration-300">
              {data?.title || "Untitled"}
            </h3>
            <p className="text-sm sm:text-md text-gray-400 mt-1">by {data?.author || "Unknown"}</p>

            {/* Availability Status */}
            <p
              className={`text-md sm:text-lg font-semibold mt-2 ${
                isAvailable ? "text-green-400" : "text-red-400"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </p>
          </div>

          {/* Additional Info (Optional) */}
          <div className="flex justify-center mt-4 space-x-2">
            <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors duration-200 text-sm sm:text-base">
              View Details
            </button>
            <button className="p-2 text-violet-400 hover:text-violet-300 hover:bg-violet-500/20 rounded-lg transition-colors duration-200 text-sm sm:text-base">
              Add to Fav
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;