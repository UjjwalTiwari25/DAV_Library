import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import DAV from '../../assets/DAV.png';
import Sail from '../../assets/Sail.png';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "MyFavorite Books", link: "/favorite-books" },
        { title: "Admin Profile", link: "/profile" }
    ];
    const isLoogedIn = useSelector((state) => state.auth.isLoogedIn);
    const role = useSelector((state) => state.auth.role);

    if(isLoogedIn ===false){
        links.splice(2,2);
    }
    if(isLoogedIn ===true && role ==="user"){
        links.splice(3,1);
    }
    if(isLoogedIn ===true && role ==="admin"){
        links.splice(2,1,{ title: "Add Books", link: "/add-books" });
    }

    const handleLogout = () => {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
    };

    // Close the navbar when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen && 
                menuRef.current && 
                !menuRef.current.contains(event.target) &&
                buttonRef.current && 
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="backdrop-blur-md bg-gradient-to-r from-[#141e30] to-[#243b55] fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg">
            <div className="flex justify-between items-center px-6 md:px-8 py-2 md:py-3">
                {/* Logo & Title */}
                <Link to="/" className="flex items-center">
                    <img className="h-8 md:h-10 me-2 drop-shadow-lg" src={Sail} alt="Sail Logo" />
                    <img className="h-8 md:h-10 me-2 drop-shadow-lg" src={DAV} alt="Dav Logo" />
                    <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 drop-shadow-lg">
                        DAV ISPAT PUBLIC SCHOOL
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-5">
                    {links.map((item, i) => (
                        <Link 
                            key={i} 
                            to={item.link} 
                            className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-110 transition-all duration-300 hover:text-white hover:drop-shadow-lg"
                        >
                            {item.title}
                        </Link>
                        
                    ))}
                    {/* Authentication Buttons */}
                    {isLoogedIn === false ? (
                        <div className="flex gap-3">
                            <Link 
                                to="/LogIn" 
                                className="px-3 py-1.5 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-105 transition-all duration-300 text-white text-base font-semibold shadow-lg"
                            >
                                LogIn
                            </Link>
                            <Link 
                                to="/SignUp" 
                                className="px-3 py-1.5 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-105 transition-all duration-300 text-white text-base font-semibold shadow-lg"
                            >
                                SignUp
                            </Link>
                        </div>
                    ) : (
                        <button 
                            onClick={handleLogout}
                            className="px-3 py-1.5 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-600 to-purple-400 hover:scale-105 transition-all duration-300 text-white text-base font-semibold shadow-lg"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)} 
                    className="md:hidden text-white text-3xl"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu - Repositioned to top right */}
            {isOpen && (
                <div 
                    ref={menuRef}
                    className="mobile-menu md:hidden absolute top-14 right-4 w-48 bg-gray-900/95 backdrop-blur-md p-4 rounded-lg shadow-xl border border-gray-700 z-50"
                >
                    <div className="flex flex-col items-start gap-3 py-2">
                        {links.map((item, i) => (
                            <Link 
                                key={i} 
                                to={item.link} 
                                className="text-sm font-medium text-white hover:text-blue-400 transition-all duration-300 w-full"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                        {/* Mobile Auth Buttons */}
                        <div className="w-full border-t border-gray-700 my-1 pt-2">
                            {isLoogedIn === false ? (
                                <div className="flex flex-col gap-2 w-full">
                                    <Link 
                                        to="/LogIn" 
                                        className="w-full px-3 py-1.5 border border-blue-500/30 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-all duration-300 text-white text-sm font-medium flex justify-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        LogIn
                                    </Link>
                                    <Link 
                                        to="/SignUp" 
                                        className="w-full px-3 py-1.5 border border-purple-500/30 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300 text-white text-sm font-medium flex justify-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        SignUp
                                    </Link>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full px-3 py-1.5 border border-red-500/30 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 text-white text-sm font-medium flex justify-center"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;