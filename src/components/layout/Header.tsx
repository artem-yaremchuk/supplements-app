import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className="border-b bg-white px-6 py-4 shadow-sm dark:bg-slate-800">
      <nav className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <NavLink to="/" className="text-accent text-xl font-bold">
          SupplementsApp
        </NavLink>

        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-link-text-active' : 'text-gray-600 dark:text-slate-200'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/supplements"
              className={({ isActive }) =>
                isActive ? 'text-link-text-active' : 'text-gray-600 dark:text-slate-200'
              }
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
