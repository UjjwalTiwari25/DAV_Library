import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0d0d0d] text-white py-8 border-t-2 border-gray-600">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-left md:text-start">
                
                {/* Contact Section */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-500">📞 CONTACT US</h3>
                    <p className="text-white-300 font-semibold">
                        DAV Ispat Public School, Sector 8/B<br />
                        Bokaro Steel City, Jharkhand - 827009
                    </p>
                </div>

                {/* Email & Website */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-500">📧 Email</h3>
                    <p>
                        <a href="mailto:davbsl8b@gmail.com" className="text-white-300 hover:underline font-semibold">
                            davbsl8b@gmail.com
                        </a>
                    </p>
                    <h3 className="text-xl font-semibold text-blue-500">🌐 Official Website</h3>
                    <p>
                        <a href="http://davispat8b.org/" target="_blank" rel="noopener noreferrer" className="text-white-300 hover:underline font-semibold">
                            davispat8b.org
                        </a>
                    </p>
                </div>

                {/* Location */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-500">📍 LOCATION</h3>
                    <div>
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17202.975685389647!2d86.165471!3d23.685635!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f42300123789b9%3A0x20cba9de33f2aab3!2sDAV%20ISPAT%20PUBLIC%20SCHOOL%208%2FB!5e1!3m2!1sen!2sin!4v1740396094663!5m2!1sen!2sin"
                            className="w-full h-28 rounded-md border border-gray-600 shadow-md"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Social Media */}
                <div className="space-y-3">
    <h3 className="text-2xl font-semibold  text-blue-500">🔗 Social Media</h3>
    <div className="flex gap-4 justify-start">
        <a href="https://www.facebook.com/profile.php?id=61563293917250" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-500 text-4xl hover:scale-125 transition-transform duration-300" />
        </a>
        <a href="https://www.instagram.com/dav.8b" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-500 text-4xl hover:scale-125 transition-transform duration-300" />
        </a>
        <a href="https://youtube.com/@davips8b" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-red-500 text-4xl hover:scale-125 transition-transform duration-300" />
        </a>
        
    </div>
                           {/* Contact Developer */}
                           <a 
    href="https://www.linkedin.com/in/ujjwaltiwari25/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 bg-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300"
>
    <FaLinkedin className="text-blue-400 text-sm" /> 
    <span className="text-white text-base  font-medium">Contact Developer</span>
</a>

</div>

            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-center items-center px-6 mt-6 text-white-400 text-sm font-bold">
                <p className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} DAV Ispat Public School, Sector 8/B (Jharkhand). All Rights Reserved.
                </p>

              
            </div>

            {/* Scroll to Top */}
            <button 
                className="fixed bottom-5 right-5 bg-violet-700 p-3 rounded-full shadow-lg cursor-pointer hover:bg-purple-600 transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <FaArrowUp className="text-white text-lg" />
            </button>
        </footer>
    );
};

export default Footer;
