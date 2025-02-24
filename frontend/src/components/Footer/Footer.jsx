import React from 'react';

const Footer = () => {
    const links = [
        { title: "Official Website", link: "/" },
        { title: "Instagram", link: "/ig" },
        { title: "YouTube", link: "/youtube" },
        { title: "Contact Us", link: "/contact-us" },
        { title: "Location", link: "/location" },
        
    ];

    return (
        <footer className=" relative backdrop-blur-lg bg-gradient-to-r from-[#141e30] to-[#243b55] text-white py-8 shadow-xl border-t border-gray-700">
            <div className="container mx-auto flex flex-col items-center justify-center gap-2">
                
                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-6">
                    {links.map((item, index) => (
                        <a 
                            key={index} 
                            href={item.link} 
                            className="text-lg font-medium text-gray-300 hover:text-blue-400 transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-lg"
                        >
                            {item.title}
                        </a>
                    ))}
                </nav>

                {/* Social Media Icons */}
                <div className="flex ">
                    <a href="#" className="hover:scale-125 transition-all duration-300">
                        <i className="fab fa-facebook text-blue-500 text-xl"></i>
                    </a>
                    <a href="#" className="hover:scale-125 transition-all duration-300">
                        <i className="fab fa-twitter text-blue-400 text-xl"></i>
                    </a>
                    <a href="#" className="hover:scale-125 transition-all duration-300">
                        <i className="fab fa-instagram text-pink-500 text-xl"></i>
                    </a>
                    <a href="#" className="hover:scale-125 transition-all duration-300">
                        <i className="fab fa-youtube text-red-500 text-xl"></i>
                    </a>
                </div>
                
                {/* Copyright Section */}
                <p className="text-center text-sm xl:text-lg font-mono text-gray-400 hover:text-gray-200 transition-colors duration-300">
                    &copy; {new Date().getFullYear()}, All Rights Reserved | <span className="text-blue-400">DAV ISPAT PUBLIC SCHOOL</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
