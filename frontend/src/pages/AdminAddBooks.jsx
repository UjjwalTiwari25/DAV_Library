import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

const AdminAddBooks = () => {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        url: '',
        category: '',
        language: '',
        available: true,
    });
    const [loading, setLoading] = useState(false);

    // Define categories array
    const categories = [
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
        "Maths",
        "Physics",
        "Chemistry",
        "Biology",
        "Encyclopedia",
        "Reference Book",
        "Dictionary",
        "Others"
    ];

    // Define languages array
    const languages = [
        "English",
        "Hindi"
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/v1/add-book',
                bookData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === "Success") {
                toast.success('Book added successfully!');
                // Reset form
                setBookData({
                    title: '',
                    author: '',
                    url: '',
                    category: '',
                    language: '',
                    available: true,
                });
            }
        } catch (error) {
            console.error('Error adding book:', error);
            toast.error(error.response?.data?.message || 'Failed to add book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-16 sm:pt-20 px-4">
            <button
                onClick={() => navigate('/profile')}
                className="fixed top-16 sm:top-20 left-4 p-2 flex items-center text-white hover:text-blue-400 transition-all duration-300 text-sm sm:text-base"
            >
                <FiArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Back to Profile
            </button>

            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                    Add New Book
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Form fields with responsive styling */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                            Book Cover Image URL
                        </label>
                        <input
                            type="text"
                            name="url"
                            value={bookData.url}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter image URL"
                            className="w-full p-2 sm:p-3 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 text-sm sm:text-base"
                        />
                    </div>

                    {/* Book Title */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                            Book Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={bookData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 sm:p-3 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 text-sm sm:text-base"
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={bookData.author}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 sm:p-3 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 text-sm sm:text-base"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            value={bookData.category}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 sm:p-3 bg-[#1e293b] border border-gray-600 rounded-md text-white [&>option]:bg-[#1e293b] [&>option]:text-white text-sm sm:text-base"
                        >
                            <option value="" className="bg-[#1e293b] text-gray-400">Select Category</option>
                            {categories.map((category, index) => (
                                <option 
                                    key={index} 
                                    value={category} 
                                    className="bg-[#1e293b] text-white"
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Language Dropdown */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                            Language
                        </label>
                        <select
                            name="language"
                            value={bookData.language}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 sm:p-3 bg-[#1e293b] border border-gray-600 rounded-md text-white [&>option]:bg-[#1e293b] [&>option]:text-white text-sm sm:text-base"
                        >
                            <option value="" className="bg-[#1e293b] text-gray-400">Select Language</option>
                            {languages.map((language, index) => (
                                <option 
                                    key={index} 
                                    value={language} 
                                    className="bg-[#1e293b] text-white"
                                >
                                    {language}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Availability Toggle */}
                    <div className="space-y-2">
                        <label className="block text-sm sm:text-base font-medium text-gray-300 mb-1 sm:mb-2">
                            Availability Status
                        </label>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setBookData(prev => ({ ...prev, available: true }))}
                                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                    bookData.available 
                                    ? 'bg-green-500/20 text-green-400 ring-2 ring-green-400' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                            >
                                ✓ Available
                            </button>
                            <button
                                type="button"
                                onClick={() => setBookData(prev => ({ ...prev, available: false }))}
                                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                    !bookData.available 
                                    ? 'bg-red-500/20 text-red-400 ring-2 ring-red-400' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                            >
                                ✕ Unavailable
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-400 text-white py-2 sm:py-3 px-4 rounded-md hover:opacity-90 transition duration-300 disabled:opacity-50 text-sm sm:text-base"
                    >
                        {loading ? 'Adding Book...' : 'Add Book'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAddBooks;
