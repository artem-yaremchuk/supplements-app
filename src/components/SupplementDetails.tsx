import type { Supplement } from '../types/supplements';
import { motion } from 'framer-motion';

type Props = {
  item: Supplement;
  onClose: () => void;
};

export default function SupplementDetails({ item, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button
          className="hover:text-accent mb-4 ml-auto block text-gray-500 transition-colors"
          onClick={onClose}
          type="button"
        >
          Close
        </button>

        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="mt-2 text-sm text-gray-700">{item.fullDesc}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.mechanisms.map((m, index) => (
            <li
              key={index}
              className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-slate-700 dark:text-slate-50"
            >
              {m}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs font-bold text-gray-600">
          Evidence level: <span className="font-medium">{item.evidence}</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
