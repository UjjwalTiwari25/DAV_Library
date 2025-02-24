import React, { useState } from 'react';
import DAV from '../../assets/DAV.png';
import Sail from '../../assets/Sail.jpeg';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons for menu

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "Favorite Books", link: "/favorite-books" },
        { title: "Profile", link: "/profile" },
    ];

    return (
        <div className="backdrop-blur-md bg-gradient-to-r from-[#141e30] to-[#243b55] fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg">
            <div className="flex justify-between items-center px-6 md:px-8 py-4">
                
                {/* Left Side - Logos and Title */}
                <div className="flex items-center">
                    <img className="h-10 md:h-12 me-2 drop-shadow-lg" src={Sail} alt="Sail Logo" />
                    <img className="h-10 md:h-12 me-2 drop-shadow-lg" src={DAV} alt="Dav Logo" />
                    <h1 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 drop-shadow-lg">
                        DAV ISPAT PUBLIC SCHOOL
                    </h1>
                </div>

                {/* Right Side - Navigation Links & Buttons */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((item, i) => (
                        <a key={i} href={item.link} className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 
                            hover:scale-110 transition-all duration-300 hover:text-white hover:drop-shadow-lg">
                            {item.title}
                        </a>
                    ))}
                    <div className="flex gap-4">
                        <button className="px-4 py-2 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 
                            hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-600 
                            hover:scale-105 transition-all duration-300 text-white text-lg font-semibold rounded-lg shadow-lg">
                            LogIn
                        </button>
                        <button className="px-4 py-2 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 
                            hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-600 
                            hover:scale-105 transition-all duration-300 text-white text-lg font-semibold rounded-lg shadow-lg">
                            SignUp
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white text-3xl">
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu (Shows when isOpen is true) */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-[#1e293b] border-t border-white/10">
                    {links.map((item, i) => (
                        <a key={i} href={item.link} className="text-lg font-semibold text-white hover:text-blue-400 transition-all duration-300">
                            {item.title}
                        </a>
                    ))}
                    <div className="flex flex-col gap-2 w-full items-center">
                        <button className="w-3/4 px-4 py-2 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 
                            hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-600 
                            hover:scale-105 transition-all duration-300 text-white text-lg font-semibold shadow-lg">
                            LogIn
                        </button>
                        <button className="w-3/4 px-4 py-2 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 
                            hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-600 
                            hover:scale-105 transition-all duration-300 text-white text-lg font-semibold shadow-lg">
                            SignUp
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
