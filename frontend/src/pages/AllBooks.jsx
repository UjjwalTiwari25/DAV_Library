import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import { toast } from "react-hot-toast";
import { useLocation } from 'react-router-dom';

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Books");
  const location = useLocation();

  // Define categories array (same as in AdminAddBooks)
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
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-all-books",
        {
          params: {
            category: category === "All Books" ? "" : category,
            _t: new Date().getTime()
          }
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [location.key, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-24 sm:pt-28 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <h4 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-lg leading-tight mb-6 sm:mb-8">
          All Books
        </h4>

        {/* Category Scrollbar */}
        <div className="relative mb-6 sm:mb-8">
          {/* Gradient Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0f172a] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0f172a] to-transparent z-10"></div>

          {/* Scrollable Categories */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-3 sm:space-x-4 px-8 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-sm sm:text-base whitespace-nowrap
                    ${selectedCategory === category
                      ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-400'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
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
                <div className="col-span-2 sm:col-span-3 md:col-span-4 text-center py-8">
                  <p className="text-gray-400 text-sm sm:text-base">
                    No books available in this category
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
