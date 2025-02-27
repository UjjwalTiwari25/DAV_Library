import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader"; // Corrected import path

const ViewBookDescription = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null); // State to store book details
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/get-book-by-id/${id}`
        );
        setBook(response.data.data); // Store fetched book details in state
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader /> {/* Show loader while fetching data */}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="mt-8 px-4 w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight">
          {book.title}
        </h1>
        <p className="text-sm sm:text-md text-gray-400 mt-2">by {book.author}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book Cover Image */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={book.url || "https://via.placeholder.com/400x600"}
              alt={book.title}
              className="w-full h-auto rounded-2xl border border-gray-700/50 backdrop-blur-xl hover:border-gray-700 transition-all duration-300"
            />
          </div>

          {/* Book Details */}
          <div className="space-y-4">
            <p className="text-lg sm:text-xl text-gray-300">
              <span className="font-semibold">Category:</span> {book.category}
            </p>
            <p className="text-lg sm:text-xl text-gray-300">
              <span className="font-semibold">Language:</span> {book.language}
            </p>
            <p className="text-lg sm:text-xl text-gray-300">
              <span className="font-semibold">Availability:</span>{" "}
              {book.available ? (
                <span className="text-green-400">Available</span>
              ) : (
                <span className="text-red-400">Unavailable</span>
              )}
            </p>
            <p className="text-lg sm:text-xl text-gray-300">
              <span className="font-semibold">Added By:</span> {book.addedBy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDescription;