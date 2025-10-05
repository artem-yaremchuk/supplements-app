import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Supplement } from '@/types/supplements';
import Loader from '../components/Loader';
import SupplementList from '../components/SupplementList';
import { useGetSupplementsQuery } from '../redux/supplements/supplements.api';

const EMPTY_ITEMS: Supplement[] = [];

const SupplementsPage = () => {
  const { data: items = EMPTY_ITEMS, isLoading, error } = useGetSupplementsQuery();

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
    <section className="p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Supplements encyclopedia</h1>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="focus:border-focus bg-ui-bg text-input-text border-ui-border w-full rounded border px-3 py-2 transition-colors outline-none sm:w-80"
          />
        </div>
      </div>

      {isLoading && <Loader />}
      {error && (
        <p className="flex flex-col items-center justify-center gap-2 p-6 text-[18px]">
          Failed to load supplements
        </p>
      )}
      {!isLoading && !error && <SupplementList items={filtered} onOpen={handleOpen} />}
    </section>
  );
};

export default SupplementsPage;
