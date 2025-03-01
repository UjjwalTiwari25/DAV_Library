import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Heart } from "lucide-react";
import API_BASE_URL from "../../config/api";

const ViewBookDescription = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Add cache-busting parameter to prevent caching
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/get-book-by-id/${id}?_t=${Date.now()}`
        );
        setBook(response.data.data);
        
        // Check if the book is in favorites
        checkFavoriteStatus(response.data.data._id);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Function to check if book is in favorites
  const checkFavoriteStatus = (bookId) => {
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(bookId));
  };

  // Function to toggle favorite status
  const toggleFavorite = () => {
    if (!book) return;

    // Get current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Toggle favorite status
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(favId => favId !== book._id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push(book._id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    // Update state
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight">
            {book.title}
          </h1>
        </div>
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

            {/* Add to Favorites Button */}
            <button
              onClick={toggleFavorite}
              className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 mt-4 border border-gray-700/50"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                size={24}
                className={`transition-all duration-300 ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-400"
                }`}
              />
              <span className="text-lg text-white font-medium">
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDescription;