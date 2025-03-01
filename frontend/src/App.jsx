import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import FavoriteBooks from './pages/FavoriteBooks';
import ExploreNow from './pages/ExploreNow';
import ViewBookDescription from './components/ViewBooksDescription/ViewBookDescription';
import AdminProfile from './pages/AdminProfile';
import AdminAddBooks from './pages/AdminAddBooks';
import ManageBooks from './pages/ManageBooks';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector
import { authActions } from './store/auth';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoogedIn);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
    
    // Increment visitor counter on every page load/refresh
    const visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');
    localStorage.setItem('visitorCount', (visitorCount + 1).toString());
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-Books" element={<AllBooks />} />
          <Route path="/favorite-books" element={<FavoriteBooks />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/explore-now" element={<ExploreNow />} />
          <Route path="view-book-description/:id" element={<ViewBookDescription />} />
          
          {/* Admin Routes */}
          <Route 
            path="/profile" 
            element={
              isLoggedIn && role === "admin" ? <AdminProfile /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/add-books" 
            element={
              isLoggedIn && role === "admin" ? <AdminAddBooks /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/manage-books" 
            element={
              isLoggedIn && role === "admin" ? <ManageBooks /> : <Navigate to="/" />
            } 
          />
        </Routes>
        <Footer />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
