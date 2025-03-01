import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const fetchData = async () => {
    try {
      // Add cache-busting parameter to prevent caching
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-recent-books?_t=${Date.now()}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch recent books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lastRefresh]);

  // Set up an interval to refresh data every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastRefresh(Date.now());
    }, 60000); // 1 minute

    return () => clearInterval(intervalId);
  }, []);

  // Add a manual refresh function
  const refreshData = () => {
    setLoading(true);
    setLastRefresh(Date.now());
  };

  return (
    <div className="min-h-4 flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight">
            Recently Added Books
          </h4>
          <button 
            onClick={refreshData}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-blue-400 transition-all duration-300"
            title="Refresh books"
          >
            ↻
          </button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        ) : (
          <>
            {data.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                {data.map((book, i) => (
                  <div key={i} className="w-full">
                    <BookCard data={book} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">No books available</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;