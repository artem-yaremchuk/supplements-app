import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const BurgerMenuModal = ({ isMenuOpen, toggleMenu }: Props) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="bg-ui-bg fixed inset-0 z-50 flex flex-col items-center justify-center sm:hidden"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        >
          <button
            onClick={toggleMenu}
            className="hover:text-hover absolute top-6 right-6 transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <CircleX />
          </button>

          <ul className="flex flex-col items-center gap-6 text-xl font-medium">
            <li>
              <NavLink to="/" onClick={toggleMenu} className="hover:text-hover transition-colors">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/supplements"
                onClick={toggleMenu}
                className="hover:text-hover transition-colors"
              >
                Supplements
              </NavLink>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BurgerMenuModal;
