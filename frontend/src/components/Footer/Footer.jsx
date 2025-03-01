import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaArrowUp, FaXTwitter } from 'react-icons/fa6';
import { FaUsers, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const Footer = () => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [stats, setStats] = useState({ visitors: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    const aboutSections = {
        "About School": "DAV Ispat Public School, Sector 8B, established in 1991, is a CBSE-affiliated co-educational English medium school. It caters to both the children of steel plant employees and underprivileged students. Offering Science, Commerce, and Arts streams for XI and XII, the school focuses on holistic development through academics, personality building, and extracurricular activities. A dedicated faculty fosters self-discipline and value-based education, ensuring a well-rounded learning environment.",
    
        "Principal Message": "Education is transformative, and I am committed to a child-centered approach that nurtures confidence and holistic growth. DAV Ispat Public School thrives on student excellence, teacher dedication, and strong leadership. My mission is to empower each student, unlocking their unique potential through guidance and encouragement. Together, we will achieve new milestones.\n\nWarm regards,\nNagendra Prasad, Principal",
    
        "Vision and Mission": "Our mission is to provide quality education to the children of Bokaro Steel Plant employees and the local community. We are dedicated to fostering an environment that supports holistic growth and excellence."
    };
    
    // Fetch visitor and user stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // For now, use localStorage values
                const visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');
                const userCount = 3; // Hardcoded for now
                
                setStats({
                    visitors: visitorCount,
                    users: userCount,
                    error: null
                });
                
                // When you're ready to use the real API:
                // const response = await axios.get('https://davispatlibrary-s0pe.onrender.com/api/v1/stats');
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchStats();
        
        // Refresh stats every minute
        const intervalId = setInterval(fetchStats, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <footer className="bg-[#0d0d0d] text-white py-8 border-t-2 border-gray-600 relative">
            <style jsx>{`
                .truncate-2-lines {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
            
            {/* Selected Section Modal */}
            {selectedSection && (
                <div 
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 py-6"
                    onClick={() => setSelectedSection(null)}
                >
                    <motion.div 
                        className="w-full max-w-md bg-gray-800 p-5 rounded-lg shadow-xl border border-gray-700"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-semibold text-blue-500 mb-3 border-b border-gray-700 pb-2">{selectedSection}</h3>
                        <div className="max-h-[60vh] overflow-y-auto pr-2">
                            <p className="text-white text-sm whitespace-pre-line leading-relaxed">
                                {aboutSections[selectedSection]}
                            </p>
                        </div>
                        <button 
                            className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded text-sm font-medium transition-colors duration-300 shadow-md" 
                            onClick={() => setSelectedSection(null)}
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
            
            <div className="container mx-auto px-4 md:px-6">
                {/* Footer Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4 justify-items-start">
                    {/* Column 1: About Us Section */}
                    <div className="space-y-3 w-full">
                        <h3 className="text-lg font-semibold text-blue-500 flex items-center">
                            <span className="mr-1">ℹ️</span> ABOUT US
                        </h3>
                        <div className="space-y-2">
                            {Object.keys(aboutSections).map((section) => (
                                <p 
                                    key={section} 
                                    className="text-gray-300 text-sm font-medium cursor-pointer hover:text-blue-400 transition-all duration-300"
                                    onClick={() => setSelectedSection(section)}
                                >
                                    {section}
                                </p>
                            ))}
                        </div>
                    </div>
                    
                    {/* Column 2: Contact Section */}
                    <div className="space-y-3 w-full">
                        <h3 className="text-lg font-semibold text-blue-500 flex items-center">
                            <span className="mr-1">📞</span> CONTACT US
                        </h3>
                        <p className="text-gray-300 text-sm font-medium">8102382109</p>
                        
                        <h3 className="text-lg font-semibold text-blue-500 flex items-center mt-5">
                            <span className="mr-1">📍</span> ADDRESS
                        </h3>
                        <p className="text-gray-300 text-sm font-medium truncate-2-lines">
                            DAV Ispat Public School, Sector 8/B, Bokaro Steel City, Jharkhand - 827009
                        </p>
                    </div>

                    {/* Column 3: Email & Website */}
                    <div className="space-y-3 w-full">
                        <h3 className="text-lg font-semibold text-blue-500 flex items-center">
                            <span className="mr-1">📧</span> EMAIL
                        </h3>
                        <p>
                            <a 
                                href="mailto:davbsl8b@gmail.com" 
                                className="text-gray-300 text-sm hover:text-blue-400 font-medium transition-colors duration-300"
                            >
                                davbsl8b@gmail.com
                            </a>
                        </p>
                        
                        <h3 className="text-lg font-semibold text-blue-500 flex items-center mt-5">
                            <span className="mr-1">🌐</span> WEBSITE
                        </h3>
                        <p>
                            <a 
                                href="http://davispat8b.org/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-300 text-sm hover:text-blue-400 font-medium transition-colors duration-300"
                            >
                                davispat8b.org
                            </a>
                        </p>
                    </div>

                    {/* Column 4: Location */}
                    <div className="space-y-3 sm:col-span-2 lg:col-span-1 w-full">
                        <h3 className="text-lg font-semibold text-blue-500 flex items-center">
                            <span className="mr-1">📍</span> LOCATION
                        </h3>
                        <div className="w-full h-32 rounded-md overflow-hidden border border-gray-600 shadow-md">
                            <iframe 
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17202.975685389647!2d86.165471!3d23.685635!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f42300123789b9%3A0x20cba9de33f2aab3!2sDAV%20ISPAT%20PUBLIC%20SCHOOL%208%2FB!5e1!3m2!1sen!2sin!4v1740396094663!5m2!1sen!2sin" 
                                className="w-full h-full" 
                                loading="lazy" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Column 5: Social Media */}
                    <div className="space-y-3 sm:col-span-2 lg:col-span-1 w-full">
                        <h3 className="text-lg font-semibold text-blue-500 flex items-center">
                            <span className="mr-1">🔗</span> SOCIAL MEDIA
                        </h3>
                        <div className="flex flex-wrap gap-3 justify-start">
                            <a 
                                href="https://www.facebook.com/..." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
                            >
                                <FaFacebook className="text-blue-500 text-xl" />
                            </a>
                            <a 
                                href="https://www.instagram.com/..." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
                            >
                                <FaInstagram className="text-pink-500 text-xl" />
                            </a>
                            <a 
                                href="https://twitter.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
                            >
                                <FaXTwitter className="text-white text-xl" />
                            </a>
                            <a 
                                href="https://youtube.com/..." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
                            >
                                <FaYoutube className="text-red-500 text-xl" />
                            </a>
                        </div>
                        <div className="mt-4 space-y-3">
                            <a 
                                href="https://www.linkedin.com/in/ujjwaltiwari25/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center sm:justify-start gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm"
                            >
                                <FaLinkedin className="text-blue-400" /> 
                                <span className="text-white font-medium">Contact Developer</span>
                            </a>
                            
                            {/* Stats Section - Side by Side Cards */}
                            <div className="grid grid-cols-2 gap-2">
                                {/* Visitors Card */}
                                <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700/50 flex flex-col items-center">
                                    <div className="flex items-center gap-1 mb-1">
                                        <FaEye className="text-blue-400 text-sm" />
                                        <span className="text-gray-300 text-xs font-medium">Visitors</span>
                                    </div>
                                    <span className="text-white font-semibold text-lg bg-blue-500/20 px-3 py-1 rounded w-full text-center">
                                        {loading ? "..." : stats.visitors.toLocaleString()}
                                    </span>
                                </div>
                                
                                {/* Users Card */}
                                <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700/50 flex flex-col items-center">
                                    <div className="flex items-center gap-1 mb-1">
                                        <FaUsers className="text-purple-400 text-sm" />
                                        <span className="text-gray-300 text-xs font-medium">Users</span>
                                    </div>
                                    <span className="text-white font-semibold text-lg bg-purple-500/20 px-3 py-1 rounded w-full text-center">
                                        {loading ? "..." : stats.users.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <p className="text-gray-400 text-xs font-medium">
                        &copy; {new Date().getFullYear()} DAV Ispat Public School, Sector 8/B (Jharkhand). All Rights Reserved.
                    </p>
                </div>
            </div>

            {/* Scroll to Top */}
            <button 
                className="fixed bottom-5 right-5 bg-violet-700 p-2 md:p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-300 z-10"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                <FaArrowUp className="text-white text-sm md:text-lg" />
            </button>

            {stats.error && (
                <div className="text-red-400 text-xs mt-1">
                    Error: {stats.error}
                </div>
            )}
        </footer>
    );
};

export default Footer;
