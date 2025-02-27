import React from 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import FavoriteBooks from './pages/FavoriteBooks';
import Profile from './pages/Profile';
import ExploreNow from './pages/ExploreNow';
import ViewBookDescription from './components/ViewBooksDescription/ViewBookDescription';

const App = () => {
  return (
    <>
      <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/all-Books" element={<AllBooks />} /> {/* Fixed: Only one route for /all-Books */}
            <Route path="/favorite-books" element={<FavoriteBooks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/explore-now" element={<ExploreNow />} /> {/* Added a new route for ExploreNow */}
            <Route path="view-book-description/:id" element={<ViewBookDescription />} />
          </Routes>
          <Footer />
      </div>
    </>
  );
};

export default App;