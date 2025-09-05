import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/selectors';
import sprite from '../assets/images/icons.svg';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector(selectUser);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        type="button"
        className="flex items-center gap-2 rounded-full px-3 py-2"
      >
        <svg className="h-8 w-8 fill-current">
          <use href={`${sprite}#icon-profile`}></use>
        </svg>

        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="bg-soft-bg absolute right-0 z-15 mt-2 w-56 rounded-md p-4 shadow-lg">
          <p className="mb-1 text-sm font-semibold">{user?.name} Artem Yaremchuk</p>
          <p className="text-secondary-text text-sm">Free Account</p>
          <hr className="border-ui-border mt-2" />

          <div className="mt-7 flex flex-col gap-1">
            <h6 className="text-sm font-semibold">My Content</h6>
            <Link to="/saved" className="text-sm hover:underline">
              Saved Pages
            </Link>
            <hr className="border-ui-border mt-2" />
          </div>

          <div className="mt-7 flex flex-col items-start gap-1">
            <h6 className="text-sm font-semibold">My Profile</h6>
            <button type="button" className="text-sm hover:underline">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
