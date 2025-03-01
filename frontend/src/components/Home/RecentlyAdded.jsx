import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard"; // Ensure this is the correct import path
import Loader from "../Loader/Loader"; // Ensure this is the correct import path
import { toast } from "react-hot-toast";
import { useLocation } from 'react-router-dom';

const RecentlyAdded = () => {
  const [data, setData] = useState([]); // State to store book data
  const [loading, setLoading] = useState(true); // State to track loading status
  const location = useLocation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-recent-books",
        {
          // Add cache buster to prevent caching
          params: { _t: new Date().getTime() }
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch recent books");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts and when location changes
  useEffect(() => {
    fetchData();
  }, [location.key]); // This will refetch when navigating back to this page

  // Add a function to refresh data
  const refreshData = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <div className="min-h-4 flex flex-col items-center justify-center px-4 md:px-12 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="w-full max-w-7xl">
        <h4 className="text-xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight mb-8">
          Recently Added Books
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-2 sm:col-span-3 md:col-span-4 flex justify-center items-center my-8">
              <Loader />
            </div>
          ) : (
            <>
              {data.length > 0 ? (
                data.map((book, i) => (
                  <div key={i} className="w-full">
                    <BookCard data={book} />
                  </div>
                ))
              ) : (
                <p className="col-span-2 sm:col-span-3 md:col-span-4 text-gray-400 text-center">
                  No books available
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;