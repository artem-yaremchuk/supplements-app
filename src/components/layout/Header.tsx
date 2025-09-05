import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className="bg-ui-bg border-b px-6 py-4 shadow-sm">
      <nav className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <NavLink to="/" className="text-accent text-xl font-bold">
          SupplementsApp
        </NavLink>

        <ul className="flex gap-6 text-sm font-medium">
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

        {!isLoggedIn && <UserMenu />}
      </nav>
    </header>
  );
};

export default Header;
