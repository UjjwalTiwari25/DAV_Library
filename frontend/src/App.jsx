import 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';




const App = () => {
  return (
    <>
    <div>
    
      <Navbar/>
      <Home/>
      <Footer/>
    </div>

   
    </>
  )
}

export default App;

