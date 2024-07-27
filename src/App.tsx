import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import SinglePage from './pages/SinglePage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Layout from './layout/Layout';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebase';
import { User } from 'firebase/auth';
import ProtectedRoute from './components/protectRoute/ProtectRoute';

function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/Login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/Register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Shop/:tag" element={<Shop />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="/SinglePage" element={<SinglePage />} />
            <Route path="/Cart" element={<Cart />} />
            <Route
              path="/Checkout"
              element={
                <ProtectedRoute user={user}>
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
