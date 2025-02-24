import React from 'react';
import DAV from '../../assets/DAV.png';
import Sail from '../../assets/Sail.jpeg';

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "About Us", link: "/about-us" },
        { title: "All Books", link: "/all-books" },
        { title: "Favorite Books", link: "/favorite-books" },
        { title: "Profile", link: "/profile" },
    ];

    return (
        <div className="backdrop-blur-md bg-gradient-to-r from-[#141e30] to-[#243b55] fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg">
            <div className="flex px-8 py-4 items-center justify-between">
                <div className='flex items-center'>
                    <img className='h-12 me-4 drop-shadow-lg' src={Sail} alt="Sail Logo" />
                    <img className='h-12 me-4 drop-shadow-lg' src={DAV} alt="Dav Logo" />
                    <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600  to-purple-400 drop-shadow-lg'>
                        DAV ISPAT PUBLIC SCHOOL, SECTOR 8/B, BOKARO
                    </h1>
                </div>
                <div className="nav-links flex items-center gap-6">
                    <div className="flex gap-6">
                        {links.map((item, i) => (
                            <a 
                                key={i} 
                                href={item.link} 
                                className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600  to-purple-400 
                                hover:scale-110 transition-all duration-300 hover:text-white hover:drop-shadow-lg"
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>
                    <div className='flex gap-4'>
                        <button className=" px-4 py-2 border border-blue-400 rounded-lg 
                                          bg-gradient-to-r from-blue-600  to-purple-400 rounded-lg 
                                         hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-600 
                                         hover:scale-105 transition-all duration-300
                                          text-white text-lg font-semibold rounded-lg shadow-lg">
                            LogIn
                        </button>
                        <button className='px-4 py-2 border border-blue-400 rounded-lg 
                                          bg-gradient-to-r from-blue-600  to-purple-400 rounded-lg 
                                         hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-600 
                                         hover:scale-105 transition-all duration-300
                                          text-white text-lg font-semibold rounded-lg shadow-lg'>
                            SignUp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
