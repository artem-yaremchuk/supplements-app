import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/auth/selectors';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { CircleUserRound, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/auth/operations';
import type { AppDispatch } from '../redux/store';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector(selectUser);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);

    if (isOpen) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [isOpen]);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  const handleSaved = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" onClick={stopPropagation}>
      <button
        onClick={toggleMenu}
        type="button"
        className="hover:border-hover flex items-center gap-2 rounded-full px-2 py-1 transition-colors"
      >
        <CircleUserRound size={30} strokeWidth={1} />

        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-soft-bg absolute right-0 z-15 mt-2 w-56 rounded-md p-4 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <p className="mb-1 text-sm font-semibold">{user?.name}</p>
            <p className="text-secondary-text text-sm">Free Account</p>
            <hr className="border-ui-border mt-2" />

            <ul>
              <li className="mt-7 flex flex-col gap-1">
                <p className="text-sm font-semibold">My Content</p>
                <Link to="/saved" className="text-sm hover:underline" onClick={handleSaved}>
                  Saved Pages
                </Link>
                <hr className="border-ui-border mt-2" />
              </li>

              <li className="mt-7 flex flex-col items-start gap-1">
                <p className="text-sm font-semibold">My Profile</p>
                <button className="text-sm hover:underline" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
