import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import DAV from '../../assets/DAV.png';
import Sail from '../../assets/Sail.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Category menu state
    const categoryRef = useRef(null); // Reference for category dropdown

    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "#" }, // Prevent direct navigation
        { title: "My Favorite Books", link: "/favorite-books" },
        { title: "Profile", link: "/profile" },
    ];

    const categories = [
        "All Books", "Class 10", "Class 11", "Class 12", 
        "Physics Books", "Maths Books", "Chemistry Books", "Biology Books", 
        "Encyclopedia", "Reference Books", "Dictionary"
    ];

    // Close category menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="backdrop-blur-md bg-gradient-to-r from-[#141e30] to-[#243b55] fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg">
            <div className="flex justify-between items-center px-6 md:px-8 py-4">
                {/* Logo & Title */}
                <Link to="/" className="flex items-center">
                    <img className="h-10 md:h-12 me-2 drop-shadow-lg" src={Sail} alt="Sail Logo" />
                    <img className="h-10 md:h-12 me-2 drop-shadow-lg" src={DAV} alt="Dav Logo" />
                    <h1 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 drop-shadow-lg">
                        DAV ISPAT PUBLIC SCHOOL
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((item, i) => (
                        <div key={i} className="relative">
                            <Link 
                                to={item.link} 
                                className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-110 transition-all duration-300 hover:text-white hover:drop-shadow-lg"
                                onClick={(e) => {
                                    if (item.title === "All Books") {
                                        e.preventDefault(); // Prevent navigation
                                        setIsCategoryOpen(!isCategoryOpen);
                                    }
                                }}
                            >
                                {item.title}
                            </Link>
                            {/* Desktop Category Dropdown */}
                            {item.title === "All Books" && isCategoryOpen && (
                                <div 
                                    ref={categoryRef}
                                    className="absolute top-10 left-0 bg-gray-800 p-4 rounded-lg shadow-lg w-48"
                                >
                                    {categories.map((category, index) => (
                                        <Link 
                                            key={index} 
                                            to={`/all-books?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="block text-white hover:bg-gray-700 px-4 py-2 rounded-md transition-all duration-300"
                                            onClick={() => setIsCategoryOpen(false)}
                                        >
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white text-3xl">
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-4 right-4 bg-gray-900 p-5 rounded-xl shadow-xl border border-gray-700">
                    <div className="flex flex-col items-center gap-4 py-4">
                        {links.map((item, i) => (
                            <div key={i} className="relative w-full">
                                <button 
                                    className="w-full text-lg font-semibold text-white hover:text-blue-400 transition-all duration-300 text-center"
                                    onClick={() => {
                                        if (item.title === "All Books") {
                                            setIsCategoryOpen(!isCategoryOpen);
                                        } else {
                                            setIsOpen(false);
                                        }
                                    }}
                                >
                                    {item.title}
                                </button>
                                
                                {/* Mobile Category Dropdown */}
                                {item.title === "All Books" && isCategoryOpen && (
                                    <div 
                                        ref={categoryRef}
                                        className="mt-2 bg-gray-800 p-4 rounded-lg shadow-lg w-full"
                                    >
                                        {categories.map((category, index) => (
                                            <Link 
                                                key={index} 
                                                to={`/all-books?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="block text-white hover:bg-gray-700 px-4 py-2 rounded-md transition-all duration-300"
                                                onClick={() => {
                                                    setIsCategoryOpen(false);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <div className="flex flex-col gap-2 w-full items-center">
                            <Link 
                                to="/LogIn" 
                                className="w-3/4 px-4 py-2 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-105 transition-all duration-300 text-white text-lg font-semibold shadow-lg flex justify-center"
                            >
                                LogIn
                            </Link>
                            <Link 
                                to="/SignUp" 
                                className="w-3/4 px-4 py-2 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-105 transition-all duration-300 text-white text-lg font-semibold shadow-lg flex justify-center"
                            >
                                SignUp
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
