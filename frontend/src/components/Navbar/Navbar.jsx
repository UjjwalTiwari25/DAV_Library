import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import DAV from '../../assets/DAV.png';
import Sail from '../../assets/Sail.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "MyFavorite Books", link: "/favorite-books" },
        { title: "Profile", link: "/profile" },
    ];

    return (
        <nav className="backdrop-blur-md bg-gradient-to-r from-[#141e30] to-[#243b55] fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg">
            <div className="flex justify-between items-center px-6 md:px-8 py-4">
                {/* Logo & Title */}
                <Link to="/" className="flex items-center">
                    <img className="h-10 md:h-12 me-2 drop-shadow-lg" src={Sail} alt="Sail Logo" />
                    <img className="h-10 md:h-12 me-2 drop-shadow-lg" src={DAV} alt="Dav Logo" />
                    <h1 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 drop-shadow-lg">
                        DAV ISPAT PUBLIC SCHOOL, SECTOR 8/B, BOKARO 
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((item, i) => (
                        <Link 
                            key={i} 
                            to={item.link} 
                            className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-110 transition-all duration-300 hover:text-white hover:drop-shadow-lg"
                        >
                            {item.title}
                        </Link>
                    ))}
                    {/* Authentication Buttons */}
                    <div className="flex gap-4">
                        <Link 
                            to="/LogIn" 
                            className="px-4 py-2 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-105 transition-all duration-300 text-white text-lg font-semibold shadow-lg"
                        >
                            LogIn
                        </Link>
                        <Link 
                            to="/SignUp" 
                            className="px-4 py-2 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-105 transition-all duration-300 text-white text-lg font-semibold shadow-lg"
                        >
                            SignUp
                        </Link>
                    </div>
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
                            <Link 
                                key={i} 
                                to={item.link} 
                                className="text-lg font-semibold text-white hover:text-blue-400 transition-all duration-300"
                            >
                                {item.title}
                            </Link>
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