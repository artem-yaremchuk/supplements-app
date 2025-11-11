import { useNavigate, useParams } from 'react-router-dom';
import { useGetSupplementsQuery } from '../redux/supplement/supplementApi';
import SupplementDetails from './SupplementDetails';
import { AnimatePresence } from 'framer-motion';

const SupplementDetailsModal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { supplement } = useGetSupplementsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      supplement: data?.find((s) => s.id === id),
    }),
  });

  const handleClose = () => navigate(-1);

  return (
    <AnimatePresence>
      {supplement && <SupplementDetails item={supplement} onClose={handleClose} />}
    </AnimatePresence>
  );
};

export default SupplementDetailsModal;
