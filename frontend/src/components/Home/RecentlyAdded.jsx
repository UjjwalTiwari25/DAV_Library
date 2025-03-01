import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard"; // Ensure this is the correct import path
import Loader from "../Loader/Loader"; // Ensure this is the correct import path
import { toast } from "react-hot-toast";

const RecentlyAdded = () => {
  const [data, setData] = useState([]); // State to store book data
  const [loading, setLoading] = useState(true); // State to track loading status

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-recent-books"
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
  }, []); // This will fetch once when component mounts

  // Add a function to refresh data
  const refreshData = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <div className="min-h-4 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-10 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="mt-8 px-4">
        <h4 className="text-xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight">
          Recently Added Books
        </h4>
        <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 md:gap-24">
          {/* Display loader while fetching data */}
          {loading ? (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          ) : (
            <>
              {/* Display books if data is available */}
              {data.length > 0 ? (
                data.map((book, i) => (
                  <div key={i}>
                    <BookCard data={book} />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No books available</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;