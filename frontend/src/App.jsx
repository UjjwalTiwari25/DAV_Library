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
import { useSelector, useDispatch } from 'react-redux';
import { loginRestore } from './redux/slices/authSlice';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoogedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(loginRestore());
    }
  }, [dispatch]);

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/explore-now" element={<ExploreNow />} />
          <Route path="view-book-description/:id" element={<ViewBookDescription />} />
          
          {/* Protected Routes */}
          {isLoggedIn && (
            <>
              {role === 'admin' && (
                <>
                  <Route path="/profile" element={<AdminProfile />} />
                  <Route path="/add-books" element={<AdminAddBooks />} />
                  <Route path="/manage-books" element={<ManageBooks />} />
                </>
              )}
              <Route path="/favorite-books" element={<FavoriteBooks />} />
            </>
          )}
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
