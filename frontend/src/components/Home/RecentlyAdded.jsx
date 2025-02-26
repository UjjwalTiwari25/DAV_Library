import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentlyAdded = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/get-recent-books');
                setData(response.data);  // Store data in state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-4 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
            <div className='mt-8 px-4'>
                <h4 className='text-xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r  from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight'>
                    Recently Added Books
                </h4>
                <ul className="mt-4 text-lg">
                    {data.map((book, index) => (
                        <li key={index} className="mt-2">{book.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RecentlyAdded;
