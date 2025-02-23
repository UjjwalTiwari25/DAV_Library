import 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-site-dark text-white">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  )
}

export default App;

