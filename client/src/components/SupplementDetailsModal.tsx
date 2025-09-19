import { useNavigate, useParams } from 'react-router-dom';
import { supplements } from '../mocks/supplements';
import SupplementDetails from './SupplementDetails';
import { AnimatePresence } from 'framer-motion';

const SupplementDetailsModal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = supplements.find((s) => s.id === id);

  const handleClose = () => navigate(-1);

  return (
    <AnimatePresence>
      {item && <SupplementDetails item={item} onClose={handleClose} />}
    </AnimatePresence>
  );
};

export default SupplementDetailsModal;
