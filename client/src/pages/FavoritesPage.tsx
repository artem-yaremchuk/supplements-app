import type { Supplement } from '../types/supplement';
import { useGetSupplementsQuery } from '../redux/supplement/supplementApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import SupplementList from '../components/SupplementList';

const EMPTY_ITEMS: Supplement[] = [];

const FavoritesPage = () => {
  const { data: items = EMPTY_ITEMS, isLoading, error } = useGetSupplementsQuery();

  const favoriteSupplements = items.filter((i) => i.isFavorite);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = (id: string) => {
    navigate(`/favorites/${id}`, {
      state: { background: location },
    });
  };

  return (
    <section className="p-6">
      {isLoading && <Loader />}
      {error && (
        <p className="flex flex-col items-center justify-center gap-2 p-6 text-[18px]">
          Failed to load favorite supplements
        </p>
      )}
      {favoriteSupplements.length === 0 && (
        <p className="text-center">You have no favorite supplements yet.</p>
      )}
      {!isLoading && !error && <SupplementList items={favoriteSupplements} onOpen={handleOpen} />}
    </section>
  );
};

export default FavoritesPage;
