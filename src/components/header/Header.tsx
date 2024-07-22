import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoSvgUrl from '../../assets/Logo.svg';
import loginSvgUrl from '../../assets/Login.svg';
import shopSvgUrl from '../../assets/Shop.svg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className=" py-4 px-4 md:px-6 md:py-6 relative md:flex md:justify-around md:items-center ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logoSvgUrl} alt="Logo SVG" className="w-8 h-8" />
          <p className=" font-bold text-2xl md:text-3xl">Furniro</p>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${
          isOpen
            ? 'fixed top-16 right-4 w-64 bg-custom-bg rounded-lg shadow-lg p-4 z-10'
            : 'hidden'
        }`}
      >
        <nav className="flex flex-col items-start">
          <ul className="mb-4">
            <li>
              <Link to="/" className="block py-2 px-4 ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Shop" className="block py-2 px-4 ">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/About" className="block py-2 px-4">
                About
              </Link>
            </li>
            <li>
              <Link to="/Contact" className="block py-2 px-4">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex gap-4">
            <img src={loginSvgUrl} alt="Login" className="w-6 h-6" />
            <img src={shopSvgUrl} alt="Shop" className="w-6 h-6" />
          </div>
        </nav>
      </div>

      <div className="hidden md:flex gap-4">
        <nav className="flex gap-12 font-medium text-base">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/Shop">Shop</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden  md:flex md:gap-6 ">
        <img src={loginSvgUrl} alt="Login" />
        <img src={shopSvgUrl} alt="Shop" />
      </div>
    </header>
  );
};

export default Header;
