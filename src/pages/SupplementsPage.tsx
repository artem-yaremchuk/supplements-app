import { useState, useMemo, useRef, useEffect } from 'react';
import { supplements } from '../mocks/supplements';
import SupplementList from '../components/SupplementList';
import SupplementDetails from '../components/SupplementDetails';
import { AnimatePresence } from 'framer-motion';
import ThemeToogle from '../components/ui/ThemeToggle';
import type { Supplement } from '../types/supplements';
import Loader from '../components/ui/Loader';

const SupplementsPage = () => {
  const [query, setQuery] = useState('');
  const [selectedSupplementId, setSelectedSupplementId] = useState<string | null>(null);
  const [data, setData] = useState<Supplement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(supplements);
      setIsLoading(false);

      return () => clearTimeout(timer);
    }, 500);
  }, [query, data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;

    return data.filter((s) =>
      [s.name, s.shortDesc, ...s.mechanisms].some((v) => v.toLowerCase().includes(q)),
    );
  }, [query, data]);

  const handleOpen = (id: string) => setSelectedSupplementId(id);
  const handleClose = () => setSelectedSupplementId(null);

  const current = supplements.find((s) => s.id === selectedSupplementId) || null;

  return (
    <main className="mx-auto max-w-full space-y-6 p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Supplements encyclopedia</h1>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="focus:border-focus text-input-text border-input-border bg-input-bg w-full rounded border px-3 py-2 transition-colors outline-none sm:w-80"
          />

          <ThemeToogle />
        </div>
      </div>

      {isLoading ? <Loader /> : <SupplementList items={filtered} onOpen={handleOpen} />}
      <AnimatePresence>
        {current && <SupplementDetails item={current} onClose={handleClose} />}
      </AnimatePresence>
    </main>
  );
};

export default SupplementsPage;
