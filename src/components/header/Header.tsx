import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoSvgUrl from '../../assets/Logo.svg';
import loginSvgUrl from '../../assets/Login.svg';
import shopSvgUrl from '../../assets/Shop.svg';
import { useProducts } from '../../context/exportContext';
import CloseItem from '../../assets/AddtoCardIcon/CloseItem.svg';
import CloseTooltip from '../../assets/CloseAddtoCard.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { addToCard, setAddToCard } = useProducts();
  const navigate = useNavigate();

  const handleCartClick = () => {
    setShowTooltip(!showTooltip);
  };
  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };
  const handleRemoveItem = (id: string) => {
    setAddToCard((prevAddToCard) => {
      const updatedAddToCard = prevAddToCard
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return updatedAddToCard;
    });
  };
  const CartProduct = () => {
    navigate('/Cart');
    window.scrollTo(0, 0);
  };

  return (
    <header className="py-4 px-4 md:px-6 md:py-6 relative md:flex md:justify-around md:items-center">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logoSvgUrl} alt="Logo SVG" className="w-8 h-8" />
          <p className="font-bold text-2xl md:text-3xl">Furniro</p>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            className="focus:outline-none"
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
        role="navigation"
        aria-label="Mobile Navigation"
      >
        <nav className="flex flex-col items-start">
          <ul className="mb-4">
            <li>
              <Link to="/" className="block py-2 px-4">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Shop" className="block py-2 px-4">
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
            <img
              src={shopSvgUrl}
              alt="Shop"
              className="w-6 h-6"
              onClick={handleCartClick}
            />
          </div>
        </nav>
      </div>

      <div className="hidden md:flex gap-4">
        <nav
          className="flex gap-12 font-medium text-base"
          role="navigation"
          aria-label="Desktop Navigation"
        >
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
      <div className="hidden md:flex md:gap-6">
        {!showTooltip && (
          <>
            <img src={loginSvgUrl} alt="Login" />
            <img src={shopSvgUrl} alt="Shop" onClick={handleCartClick} />
          </>
        )}
      </div>
      {showTooltip && (
        <>
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20"
            onClick={handleCloseTooltip}
          ></div>
          <div className="fixed top-0 right-0  mr-4 w-[417px] h-[746px] bg-white p-4 z-30 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button
                onClick={handleCloseTooltip}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <img src={CloseTooltip} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              {addToCard.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                addToCard.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-200 py-4"
                  >
                    <img
                      src={item.images.mainImage}
                      alt={item.title}
                      className="w-[108px] h-[105px] object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <p className="text-lg font-semibold">{item.title}</p>
                      <div className="flex gap-3">
                        <p className="text-gray-600">
                          {item.quantity} <span>X</span>
                        </p>
                        <p className="text-custom-text-yellow font-medium">
                          RS {item.normalPrice}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <img
                        src={CloseItem}
                        alt="Close Icon"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="font-bold">SubTotal</p>
              <span className="font-semibold text-custom-text-yellow ">
                RS{' '}
                {addToCard.reduce(
                  (total, item) =>
                    total + item.normalPrice * (item.quantity || 1),
                  0
                )}
              </span>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="border border-black w-[87px] h-[30px] px-6 rounded-3xl text-xs"
                onClick={CartProduct}
              >
                Cart
              </button>
              <button className="border border-black w-[118px] h-[30px] px-6 rounded-3xl text-xs">
                Checkout
              </button>
              <button className="border border-black w-[135px] h-[30px] px-6 rounded-3xl text-xs">
                Comparison
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
