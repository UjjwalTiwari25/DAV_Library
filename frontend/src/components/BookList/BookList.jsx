import React, { useState, useEffect } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]); // State to store books
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(''); // State for error messages

    // Fetch books based on the selected category
    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            setError('');

            try {
                // Send a request to the backend with the selected category
                const response = await fetch(`/api/get-all-books?category=${selectedCategory}`);
                if (!response.ok) throw new Error('Failed to fetch books');
                const data = await response.json();
                setBooks(data.data); // Update the books state with the filtered data
            } catch (error) {
                setError(error.message); // Set error message if something goes wrong
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchBooks();
    }, [selectedCategory]); // Re-fetch books whenever the selected category changes

    return (
        <div className="book-list">
            <h1>Books</h1>

            {/* Category Filter Dropdown */}
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-filter"
            >
                <option value="">All Categories</option>
                <option value="Class 0">Class 0</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Encyclopedia">Encyclopedia</option>
                <option value="Physics Books">Physics Books</option>
                <option value="Maths Books">Maths Books</option>
            </select>

            {/* Display Loading or Error Messages */}
            {isLoading && <p>Loading books...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display Books */}
            <div className="books-container">
                {books.map((book) => (
                    <div key={book._id} className="book-card">
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Category: {book.category}</p>
                        <p>Language: {book.language}</p>
                        <p>Available: {book.available ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;