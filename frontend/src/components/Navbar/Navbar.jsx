import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FiMenu, FiX, FiHeart } from 'react-icons/fi';
import DAV from '../../assets/DAV.png';
import Sail from '../../assets/Sail.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoogedIn);
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        navigate('/');
        setIsOpen(false);
    };

    // Common navigation links for both desktop and mobile
    const commonLinks = (
        <>
            <Link to="/" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                Home
            </Link>
            <Link to="/all-books" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                All Books
            </Link>
            {isLoggedIn && role === "user" && (
                <Link 
                    to="/favorite-books" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                >
                    <FiHeart className="w-5 h-5" />
                    <span>My Favorite Books</span>
                </Link>
            )}
            {isLoggedIn && role === "admin" && (
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                    Admin Panel
                </Link>
            )}
        </>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-b border-gray-800 z-50">
            <div className="max-w-[95%] mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section - Left Side */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <img src={DAV} alt="DAV Logo" className="h-10 w-10 md:h-12 md:w-12" />
                            <div className="flex flex-col">
                                <span className="text-sm md:text-lg lg:text-xl font-bold text-white whitespace-nowrap">
                                    DAV ISPAT PUBLIC SCHOOL
                                </span>
                                <span className="text-xs md:text-sm text-gray-400 whitespace-nowrap">
                                    Library Management System
                                </span>
                            </div>
                            <img src={Sail} alt="Sail Logo" className="h-10 w-10 md:h-12 md:w-12" />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>

                    {/* Desktop Navigation - Right Side */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center space-x-8">
                            {commonLinks}
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-lg hover:opacity-90 transition-all duration-300 whitespace-nowrap"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all duration-300 whitespace-nowrap"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-4 py-2 border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all duration-300 whitespace-nowrap"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="absolute top-16 right-4 w-56 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-lg shadow-xl border border-gray-700 md:hidden">
                        <div className="py-2 flex flex-col">
                            <Link 
                                to="/" 
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2.5 text-gray-300 hover:bg-white/5 transition-colors"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/all-books" 
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2.5 text-gray-300 hover:bg-white/5 transition-colors"
                            >
                                All Books
                            </Link>
                            {isLoggedIn && role === "user" && (
                                <Link 
                                    to="/favorite-books" 
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-2 px-4 py-2.5 text-gray-300 hover:bg-white/5 transition-colors"
                                >
                                    <FiHeart className="w-5 h-5" />
                                    <span>My Favorite Books</span>
                                </Link>
                            )}
                            {isLoggedIn && role === "admin" && (
                                <Link 
                                    to="/profile" 
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2.5 text-gray-300 hover:bg-white/5 transition-colors"
                                >
                                    Admin Panel
                                </Link>
                            )}
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2.5 text-red-400 hover:bg-white/5 transition-colors border-t border-gray-700 mt-2"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-left px-4 py-2.5 text-blue-400 hover:bg-white/5 transition-colors border-t border-gray-700 mt-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-left px-4 py-2.5 text-blue-400 hover:bg-white/5 transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;