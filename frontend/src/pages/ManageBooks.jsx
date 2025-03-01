import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader/Loader';

const ManageBooks = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all books
    useEffect(() => {
        fetchBooks();
    }, []);

    const getAuthHeader = () => ({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/get-all-books');
            setBooks(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch books');
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle availability toggle with immediate state update
    const handleAvailabilityToggle = async (bookId, newStatus) => {
        try {
            // Update local state immediately for better UX
            setBooks(prevBooks => 
                prevBooks.map(book => 
                    book._id === bookId ? {...book, available: newStatus} : book
                )
            );

            // Make API call with only the required field
            const response = await axios.put(
                `http://localhost:3000/api/v1/update-book/${bookId}`,
                { available: newStatus },
                getAuthHeader()
            );

            if (response.data.status === "Success") {
                toast.success(`Book marked as ${newStatus ? 'Available' : 'Unavailable'}`);
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            // Revert state if API call fails
            setBooks(prevBooks => 
                prevBooks.map(book => 
                    book._id === bookId ? {...book, available: !newStatus} : book
                )
            );
            toast.error(error.response?.data?.message || 'Failed to update availability');
            console.error('Error updating availability:', error);
        }
    };

    // Handle delete book
    const handleDeleteBook = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(
                    `http://localhost:3000/api/v1/delete-book/${bookId}`,
                    getAuthHeader()
                );
                setBooks(books.filter(book => book._id !== bookId));
                toast.success('Book deleted successfully');
            } catch (error) {
                toast.error('Failed to delete book');
                console.error('Error deleting book:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-20 px-4">
            {/* Back Button */}
            <button
                onClick={() => navigate('/profile')}
                className="fixed top-20 left-4 md:left-8 p-2 flex items-center text-white hover:text-blue-400 transition-all duration-300"
            >
                <FiArrowLeft className="w-6 h-6 mr-2" />
                Back to Profile
            </button>

            <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md p-4 md:p-8 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                    Manage Books
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {/* Desktop view - Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-600">
                                        <th className="p-4 text-left">Cover</th>
                                        <th className="p-4 text-left">Title</th>
                                        <th className="p-4 text-left">Author</th>
                                        <th className="p-4 text-left">Availability</th>
                                        <th className="p-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book) => (
                                        <tr key={book._id} className="border-b border-gray-600 hover:bg-white/5">
                                            <td className="p-4">
                                                <img 
                                                    src={book.url || "https://via.placeholder.com/150"} 
                                                    alt={book.title} 
                                                    className="w-16 h-20 object-cover rounded"
                                                />
                                            </td>
                                            <td className="p-4">{book.title}</td>
                                            <td className="p-4">{book.author}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleAvailabilityToggle(book._id, true)}
                                                        className={`px-3 py-1 rounded-full transition-all duration-300 ${
                                                            book.available 
                                                            ? 'bg-green-500/20 text-green-400 ring-2 ring-green-400' 
                                                            : 'bg-white/5 text-gray-400 hover:bg-green-500/20'
                                                        }`}
                                                    >
                                                        ✓ Available
                                                    </button>
                                                    <button
                                                        onClick={() => handleAvailabilityToggle(book._id, false)}
                                                        className={`px-3 py-1 rounded-full transition-all duration-300 ${
                                                            !book.available 
                                                            ? 'bg-red-500/20 text-red-400 ring-2 ring-red-400' 
                                                            : 'bg-white/5 text-gray-400 hover:bg-red-500/20'
                                                        }`}
                                                    >
                                                        ✕ Unavailable
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <button 
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-all duration-300"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile view - Cards */}
                        <div className="md:hidden grid grid-cols-1 gap-4">
                            {books.map((book) => (
                                <div key={book._id} className="bg-white/5 p-4 rounded-lg border border-gray-700">
                                    <div className="flex items-start space-x-4">
                                        <img 
                                            src={book.url || "https://via.placeholder.com/150"} 
                                            alt={book.title} 
                                            className="w-20 h-28 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold truncate">{book.title}</h3>
                                            <p className="text-gray-300 mb-2">{book.author}</p>
                                            
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <button
                                                    onClick={() => handleAvailabilityToggle(book._id, true)}
                                                    className={`px-2 py-1 text-sm rounded-full transition-all duration-300 ${
                                                        book.available 
                                                        ? 'bg-green-500/20 text-green-400 ring-1 ring-green-400' 
                                                        : 'bg-white/5 text-gray-400 hover:bg-green-500/20'
                                                    }`}
                                                >
                                                    ✓ Available
                                                </button>
                                                <button
                                                    onClick={() => handleAvailabilityToggle(book._id, false)}
                                                    className={`px-2 py-1 text-sm rounded-full transition-all duration-300 ${
                                                        !book.available 
                                                        ? 'bg-red-500/20 text-red-400 ring-1 ring-red-400' 
                                                        : 'bg-white/5 text-gray-400 hover:bg-red-500/20'
                                                    }`}
                                                >
                                                    ✕ Unavailable
                                                </button>
                                            </div>
                                            
                                            <button 
                                                onClick={() => handleDeleteBook(book._id)}
                                                className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-all duration-300 text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageBooks; 