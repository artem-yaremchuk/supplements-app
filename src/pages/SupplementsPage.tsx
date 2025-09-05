import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store.ts';
import { selectItems, selectIsLoading, selectError } from '../redux/supplements/selectors';
import { fetchSupplements } from '../redux/supplements/operations.ts';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/ui/ThemeToggle';
import Loader from '../components/ui/Loader';
import SupplementList from '../components/SupplementList';

const SupplementsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchSupplements());
  }, [dispatch]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((s) =>
      [s.name, s.shortDesc, ...s.mechanisms].some((v) => v.toLowerCase().includes(q)),
    );
  }, [query, items]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = (id: string) => {
    navigate(`/supplements/${id}`, {
      state: { background: location },
    });
  };

  return (
    <main>
      <section className="py mx-auto max-w-full space-y-6 p-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold">Supplements encyclopedia</h1>

          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="focus:border-focus bg-ui-bg text-input-text border-ui-border w-full rounded border px-3 py-2 transition-colors outline-none sm:w-80"
            />

            <ThemeToggle />
          </div>
        </div>

        {isLoading && !error && <Loader />}

        {error && (
          <p className="flex flex-col items-center justify-center gap-2 p-6 text-[18px]">{error}</p>
        )}

        <SupplementList items={filtered} onOpen={handleOpen} />
      </section>
    </main>
  );
};

export default SupplementsPage;
