import type { Supplement } from '../types/supplements';
import { motion } from 'framer-motion';

interface Props {
  item: Supplement;
  onClose: () => void;
}

const SupplementDetails = ({ item, onClose }: Props) => {
  return (
    <motion.div
      className="bg-overlay-bg fixed inset-0 z-60 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-ui-bg w-full max-w-lg rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button
          className="hover:text-hover text-secondary-text mb-4 ml-auto block transition-colors"
          onClick={onClose}
          type="button"
        >
          Close
        </button>

        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="text-secondary-text mt-2 text-sm">{item.fullDesc}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.mechanisms.map((m, index) => (
            <li key={index} className="bg-soft-bg rounded px-2 py-1 text-xs">
              {m}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs font-bold">
          Evidence level: <span className="font-medium">{item.evidence}</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SupplementDetails;
