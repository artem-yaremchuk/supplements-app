import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import UserMenu from '../UserMenu';
import BurgerMenuModal from '../BurgerMenuModal';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-ui-bg border-b px-6 py-4 shadow-sm">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={toggleMenu}
            className="hover:text-hover transition-colors sm:hidden"
            aria-label="Open menu"
            type="button"
          >
            <Menu size={24} />
          </button>

          <NavLink to="/" className="text-accent text-xl font-bold">
            SupplementsApp
          </NavLink>
        </div>

        <ul className="hidden gap-6 text-sm font-medium sm:flex">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-link-text-active' : 'text-main-text')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/supplements"
              className={({ isActive }) => (isActive ? 'text-link-text-active' : 'text-main-text')}
            >
              Supplements
            </NavLink>
          </li>
        </ul>

        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <Link to="/login" className="hover:text-hover transition-colors">
            Login
          </Link>
        )}
      </nav>

      <BurgerMenuModal isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
