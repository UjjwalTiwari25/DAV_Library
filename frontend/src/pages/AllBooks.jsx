import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import { toast } from "react-hot-toast";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Define categories array - same as in AdminAddBooks
  const categories = [
    "All Books",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
    "Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "Encyclopedia",
    "Reference Book",
    "Dictionary",
    "Others"
  ];

  const fetchData = async (category = "") => {
    setLoading(true);
    try {
      // Add category as query parameter if it's not "All Books"
      const url = category && category !== "All Books" 
        ? `http://localhost:3000/api/v1/get-all-books?category=${encodeURIComponent(category)}`
        : "http://localhost:3000/api/v1/get-all-books";
      
      // Add cache-busting parameter to prevent caching
      const response = await axios.get(`${url}${url.includes('?') ? '&' : '?'}_t=${Date.now()}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchData(category === "All Books" ? "" : category);
  };

  // Refresh data when component mounts or lastRefresh changes
  useEffect(() => {
    fetchData(selectedCategory === "All Books" ? "" : selectedCategory);
  }, [lastRefresh, selectedCategory]);

  // Add a manual refresh function
  const refreshData = () => {
    setLastRefresh(Date.now());
  };

  // Set up an interval to refresh data every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshData();
    }, 60000); // 1 minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-10 pt-20 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight">
            All Books
          </h4>
          <button 
            onClick={refreshData}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-blue-400 transition-all duration-300"
            title="Refresh books"
          >
            ↻
          </button>
        </div>
        
        {/* Category Filter */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-400 text-white font-medium'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
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
              <div className="text-center py-10">
                <p className="text-gray-400 mb-2">No books available in this category</p>
                {selectedCategory !== "" && selectedCategory !== "All Books" && (
                  <button 
                    onClick={() => handleCategorySelect("All Books")}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-blue-400 transition-all duration-300"
                  >
                    View All Books
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
