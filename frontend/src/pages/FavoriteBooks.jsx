import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import axios from "axios";

const FavoriteBooks = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get favorite books from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    setLoading(false);
  }, []);

  const removeFromFavorites = (bookId) => {
    const updatedFavorites = favorites.filter((id) => id !== bookId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-10 pt-20 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="w-full max-w-7xl">
        <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight mb-6">
          Favorite Books
        </h4>
        
        {loading ? (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        ) : (
          <>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                {favorites.map((bookId) => (
                  <div key={bookId} className="w-full">
                    <BookCard bookId={bookId} removeFromFavorites={removeFromFavorites} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">No favorite books available</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const BookCard = ({ bookId, removeFromFavorites }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  useEffect(() => {
    // Fetch book details by ID
    const fetchBookDetails = async () => {
      try {
        // Add cache-busting parameter to prevent caching
        const response = await axios.get(
          `http://localhost:3000/api/v1/get-book-by-id/${bookId}?_t=${Date.now()}`
        );
        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [bookId, lastRefresh]);

  // Set up an interval to refresh data every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastRefresh(Date.now());
    }, 60000); // 1 minute

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="h-full w-full bg-gray-800/50 rounded-2xl animate-pulse"></div>;
  if (!book) return null;

  return (
    <div className="relative group w-full h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-gray-800 rounded-2xl p-2 sm:p-3 border border-gray-700/50 backdrop-blur-xl hover:border-gray-700 transition-all duration-300 h-full flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <img
            src={book?.url || "https://via.placeholder.com/200x300"}
            alt={book?.title || "Book Cover"}
            className="w-full aspect-[2/3] object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="mt-2 text-center">
          <h3 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors duration-300">
            {book?.title || "Untitled"}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 truncate">by {book?.author || "Unknown"}</p>
          
          <div className={`mt-1 inline-block px-2 py-0.5 rounded-full ${
            book.available 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
          }`}>
            <span className="text-xs font-semibold">
              {book.available ? '✓ Available' : '✕ Unavailable'}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between mt-1 gap-1">
          <Link 
            to={`/view-book-description/${book._id}`} 
            className="flex-1 p-1 text-center text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors duration-200 text-xs"
          >
            View
          </Link>
          <button
            onClick={() => removeFromFavorites(book._id)}
            className="flex-1 p-1 text-center text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200 text-xs"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteBooks;