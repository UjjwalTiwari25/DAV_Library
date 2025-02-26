import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaArrowUp, FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Footer = () => {
    const [selectedSection, setSelectedSection] = useState(null);

    const aboutSections = {
        "About School": "DAV Ispat Public School, Sector 8B, established in 1991, is a CBSE-affiliated co-educational English medium school. It caters to both the children of steel plant employees and underprivileged students. Offering Science, Commerce, and Arts streams for XI and XII, the school focuses on holistic development through academics, personality building, and extracurricular activities. A dedicated faculty fosters self-discipline and value-based education, ensuring a well-rounded learning environment.",
    
        "Principal Message": "Education is transformative, and I am committed to a child-centered approach that nurtures confidence and holistic growth. DAV Ispat Public School thrives on student excellence, teacher dedication, and strong leadership. My mission is to empower each student, unlocking their unique potential through guidance and encouragement. Together, we will achieve new milestones.\n\nWarm regards,\nNagendra Prasad, Principal",
    
        "Vision and Mission": "Our mission is to provide quality education to the children of Bokaro Steel Plant employees and the local community. We are dedicated to fostering an environment that supports holistic growth and excellence."
    };
    

    return (
        <footer className="bg-[#0d0d0d] text-white py-8 border-t-2 border-gray-600 relative">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-left md:text-start">
                {/* Selected Section Card */}
                {selectedSection && (
                    <motion.div 
                        className="absolute top-[-200px]  transform -translate-x-1/2 w-11/12 md:w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg z-50"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h3 className="text-xl font-semibold text-blue-500">{selectedSection}</h3>
                        <p className="text-white mt-2">{aboutSections[selectedSection]}</p>
                        <button className="mt-4 bg-blue-500 px-4 py-2 rounded-lg" onClick={() => setSelectedSection(null)}>Close</button>
                    </motion.div>
                )}
                
                {/* Column 1: About Us Section */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-500">ℹ️ ABOUT US</h3>
                    {Object.keys(aboutSections).map((section) => (
                        <p 
                            key={section} 
                            className="text-white-300 font-semibold cursor-pointer hover:text-blue-400 transition-all duration-300"
                            onClick={() => setSelectedSection(section)}
                        >
                            {section}
                        </p>
                    ))}
                </div>
                
                {/* Column 2: Contact Section */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-500">CONTACT US</h3>
                    <p className="text-white-300 font-semibold">📞 8102382109</p>
                    <h3 className="text-xl font-semibold text-blue-500 mt-4">ADDRESS 📍 </h3>
                    <p className="text-white-300 font-semibold">DAV Ispat Public School, Sector 8/B<br /> Bokaro Steel City, Jharkhand - 827009</p>
                </div>

                {/* Column 3: Email & Website */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-500">📧 Email</h3>
                    <p>
                        <a href="mailto:davbsl8b@gmail.com" className="text-white-300 hover:underline font-semibold">davbsl8b@gmail.com</a>
                    </p>
                    <h3 className="text-xl font-semibold text-blue-500 mt-4">🌐 Official Website</h3>
                    <p>
                        <a href="http://davispat8b.org/" target="_blank" rel="noopener noreferrer" className="text-white-300 hover:underline font-semibold">davispat8b.org</a>
                    </p>
                </div>

                {/* Column 4: Location */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-500">📍LOCATION</h3>
                    <iframe 
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17202.975685389647!2d86.165471!3d23.685635!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f42300123789b9%3A0x20cba9de33f2aab3!2sDAV%20ISPAT%20PUBLIC%20SCHOOL%208%2FB!5e1!3m2!1sen!2sin!4v1740396094663!5m2!1sen!2sin" className="w-full h-28 rounded-md border border-gray-600 shadow-md" loading="lazy" allowFullScreen></iframe>
                </div>

                {/* Column 5: Social Media */}
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-500">🔗 Social Media</h3>
                    <div className="flex gap-4 justify-start">
                        <a href="https://www.facebook.com/..." target="_blank"><FaFacebook className="text-blue-500 text-3xl hover:scale-125 transition-transform duration-300" /></a>
                        <a href="https://www.instagram.com/..." target="_blank"><FaInstagram className="text-pink-500 text-3xl hover:scale-125 transition-transform duration-300" /></a>
                        <a href="https://twitter.com/" target="_blank"><FaXTwitter className="text-white text-3xl hover:scale-125 transition-transform duration-300" /></a>
                        <a href="https://youtube.com/..." target="_blank"><FaYoutube className="text-red-500 text-3xl hover:scale-125 transition-transform duration-300" /></a>
                    </div>
                    <div className="mt-4">
                        <a href="https://www.linkedin.com/in/ujjwaltiwari25/" target="_blank" className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300">
                            <FaLinkedin className="text-blue-400 text-sm" /> <span className="text-white text-base font-medium">Contact Developer</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-center items-center px-6 mt-8 text-white-400 text-sm font-bold">
                <p>&copy; {new Date().getFullYear()} DAV Ispat Public School, Sector 8/B (Jharkhand). All Rights Reserved.</p>
            </div>

            {/* Scroll to Top */}
            <button className="fixed bottom-5 right-5 bg-violet-700 p-3 rounded-full shadow-lg hover:bg-purple-600" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <FaArrowUp className="text-white text-lg" />
            </button>
        </footer>
    );
};

export default Footer;
