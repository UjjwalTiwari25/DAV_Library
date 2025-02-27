import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard"; // Ensure this is the correct import path

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-recent-books"
        );
        setData(response.data.data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-4 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="mt-8 px-4">
        <h4 className="text-xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight">
          Recently Added Books
        </h4>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.length > 0 ? (
            data.map((book, i) => (
              <div key={i}>
                <BookCard data={book} />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No books available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
