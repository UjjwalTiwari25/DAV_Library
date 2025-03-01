import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Heart } from "lucide-react";
import Loader from '../components/Loader/Loader';

const FavoriteBooks = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.auth.userId);
    const token = localStorage.getItem("token");

  useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId || !token) {
                setLoading(false);
                return;
            }

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

                if (response.data.status === "Success" && response.data.data) {
                    setFavorites(response.data.data);
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
                toast.error('Failed to load favorite books');
                setFavorites([]);
            } finally {
    setLoading(false);
            }
        };

        fetchFavorites();
    }, [userId, token]);

    const removeFavorite = async (bookId) => {
        try {
            await axios.put(
                'http://localhost:3000/api/v1/remove-book-from-favourite',
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'id': userId,
                        'bookid': bookId
                    }
                }
            );
            
            // Remove from local state
            setFavorites(prev => prev.filter(book => book._id !== bookId));
            toast.success('Removed from favorites');
        } catch (error) {
            console.error('Error removing favorite:', error);
            toast.error('Failed to remove from favorites');
        }
    };

    if (loading) {
  return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]">
              <Loader />
    </div>
  );
    }

  return (
        <div className="min-h-screen pt-20 px-4 md:px-8 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]">
            <h1 className="text-3xl font-bold text-white mb-8">My Favorite Books</h1>
            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-gray-400 text-center text-lg">No favorite books yet.</p>
                    <p className="text-gray-500 text-center mt-2">
                        Add books to your favorites to see them here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {favorites.map((book) => (
                        <div 
                            key={book._id} 
                            className="group bg-[#1e293b] rounded-lg overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:transition-transform before:duration-700 border border-gray-800 hover:border-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow duration-300"
                        >
                            <Link to={`/view-book-description/${book._id}`}>
                                <div className="relative aspect-[2/3] overflow-hidden">
                                    <img
                                        src={book.url}
                                        alt={book.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </Link>
                            <div className="p-2">
                                <div className="flex justify-between items-start gap-1">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-white truncate">
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 truncate">
                                            {book.author}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFavorite(book._id)}
                                        className="flex-shrink-0 text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <Heart className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                                <div className="mt-2 flex justify-between items-center text-xs">
                                    <span className="text-gray-400 truncate max-w-[80px]">
                                        {book.category}
                                    </span>
                                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                                        book.available 
                                            ? 'bg-green-500/10 text-green-400' 
                                            : 'bg-red-500/10 text-red-400'
                                    }`}>
                                        {book.available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
    </div>
  );
};

export default FavoriteBooks;