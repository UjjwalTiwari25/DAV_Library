import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Loader from "../Loader/Loader";
import { Heart } from "lucide-react";

const ViewBookDescription = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoogedIn);
  const userId = useSelector((state) => state.auth.userId);
  const token = localStorage.getItem("token");

  // Separate fetch for book details and favorite status
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/get-book-by-id/${id}`
        );
        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error("Error loading book details");
      }
    };

    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/get-my-favourite-books',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'id': userId
            }
          }
        );
        const favBooks = response.data.data || [];
        setIsFavorite(favBooks.some(favBook => favBook._id === id));
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    const loadData = async () => {
      try {
        await fetchBookDetails();
        if (isLoggedIn && userId && token) {
          await checkFavoriteStatus();
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isLoggedIn, userId, token]);

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add favorites");
      return;
    }

    try {
      const endpoint = isFavorite 
        ? "/remove-book-from-favourite"
        : "/add-book-to-favourite";

      const response = await axios.put(
        `http://localhost:3000/api/v1${endpoint}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'id': userId,
            'bookid': id
          }
        }
      );

      if (response.data.status === "Success" || response.data.message) {
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      if (error.response?.status === 401) {
        toast.error("Please login again");
      } else {
        toast.error("Failed to update favorites");
      }
    }
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

            <p className="text-lg sm:text-xl text-gray-300">
              <span className="font-semibold">Added By:</span> {book.addedBy}
            </p>

            {/* Add to Favorites Button */}
            {isLoggedIn && (
              <button
                onClick={toggleFavorite}
                className="flex items-center space-x-2 px-6 py-2 transition-all duration-300 rounded-full"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <span className="text-lg sm:text-xl text-gray-300 font-medium">
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </span>
                <Heart
                  size={32}
                  className={`transition-all duration-300 ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDescription;