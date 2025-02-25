import 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import FavoriteBooks from './pages/FavoriteBooks';
import Profile from './pages/Profile';
import ExploreNow from './pages/ExploreNow';



const App = () => {
  return (
    <>
    <div>

      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route  path="/all-Books" element={<ExploreNow/>} />
          <Route  path="/all-Books" element={<AllBooks/>} />
          <Route  path="/favorite-books" element={<FavoriteBooks/>} />
          <Route  path="/profile" element={<Profile/>} />
          <Route  path="/LogIn" element={<LogIn/>} />
          <Route  path="/SignUp" element={<SignUp/>} />
        </Routes>
        <Footer/>
      </Router>
      
      

    </div>

   
    </>
  )
}

export default App;

