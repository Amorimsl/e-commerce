import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Footer from './components/footer/Footer';
import SinglePage from './pages/SinglePage';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Shop/:tag" element={<Shop />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="/SinglePage" element={<SinglePage />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
