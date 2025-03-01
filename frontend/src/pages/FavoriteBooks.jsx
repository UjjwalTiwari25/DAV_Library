import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader"; // Ensure this is the correct import path

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
    <div className="min-h-4 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="mt-8 px-4">
        <h4 className="text-xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight">
          Favorite Books
        </h4>
        <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 md:gap-24">
          {/* Display loader while fetching data */}
          {loading ? (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          ) : (
            <>
              {/* Display books if data is available */}
              {favorites.length > 0 ? (
                favorites.map((bookId) => (
                  <div key={bookId}>
                    <BookCard bookId={bookId} removeFromFavorites={removeFromFavorites} />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No favorite books available</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const BookCard = ({ bookId, removeFromFavorites }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details by ID
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/get-book-by-id/${bookId}`);
        const data = await response.json();
        setBook(data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  if (!book) return null;

  return (
    <div className="relative group w-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700/50 backdrop-blur-xl hover:border-gray-700 transition-all duration-300">
        <img
          src={book?.url || "https://via.placeholder.com/200x300"}
          alt={book?.title || "Book Cover"}
          className="w-full h-48 sm:h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
        />
        <div className="mt-4 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors duration-300">
            {book?.title || "Untitled"}
          </h3>
          <p className="text-sm sm:text-md text-gray-400 mt-1">by {book?.author || "Unknown"}</p>
          <p className={`text-md sm:text-lg font-semibold mt-2 ${book.available ? "text-green-400" : "text-red-400"}`}>
            {book.available ? "Available" : "Unavailable"}
          </p>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          <Link to={`/view-book-description/${book._id}`} className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors duration-200 text-sm sm:text-base">
            View Details
          </Link>
          <button
            onClick={() => removeFromFavorites(book._id)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200 text-sm sm:text-base"
          >
            Remove from Fav
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteBooks;