import { Eye } from 'lucide-react';
import type { Supplement } from '../types/supplement';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { socket } from '@/ws/socket';

interface Props {
  item: Supplement;
  onClose: () => void;
}

const SupplementDetails = ({ item, onClose }: Props) => {
  const [liveViewers, setLiveViewers] = useState(0);

  useEffect(() => {
    socket.emit('viewSupplement', { id: item.id });

    socket.on('viewersUpdate', (payload) => {
      if (payload.supplementId === item.id) {
        setLiveViewers(payload.liveViewers);
      }
    });

    return () => {
      socket.emit('leaveSupplement', { id: item.id });
    };
  }, [item.id]);

  const formattedEvidence = item.evidence.charAt(0) + item.evidence.slice(1).toLowerCase();

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

        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="font-bold">
            Evidence: <span className="font-medium">{formattedEvidence}</span>
          </div>

          <div className="flex items-center gap-1 transition-opacity hover:opacity-80">
            <Eye size={22} strokeWidth={1} />
            <p className="text-secondary-text">{liveViewers}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SupplementDetails;
