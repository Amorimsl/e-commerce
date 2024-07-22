import { Link } from 'react-router-dom';
import logoSvgUrl from '../../assets/Logo.svg';
import loginSvgUrl from '../../assets/Login.svg';
import shopSvgUrl from '../../assets/Shop.svg';

const Header = () => {
  return (
    <header>
      <div className="flex gap-2">
        <img src={logoSvgUrl} alt="Logo SVG" />
        <p className="text-black font-bold  text-3xl">Furniro</p>
      </div>
      <nav>
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

      <div>
        <img src={loginSvgUrl} />
        <img src={shopSvgUrl} />
      </div>
    </header>
  );
};

export default Header;
