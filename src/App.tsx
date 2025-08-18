import { useState, useMemo, useRef, useEffect } from 'react';
import { supplements } from './mocks/supplements';
import SupplementList from './components/SupplementList';
import SupplementDetails from './components/SupplementDetails';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import type { Supplement } from './types/supplements';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedSupplementId, setSelectedSupplementId] = useState<string | null>(null);
  const [data, setData] = useState<Supplement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { theme, toogleTheme } = useTheme();

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
    <main className={`${theme} mx-auto max-w-full space-y-6 p-6`}>
      <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Supplements encyclopedia</h1>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, mechanism..."
            className="focus:border-accent w-full rounded border border-gray-300 px-3 py-2 transition-colors outline-none sm:w-80"
          />

          <button
            type="button"
            onClick={toogleTheme}
            className="rounded border border-gray-300 px-3 py-2 text-sm whitespace-nowrap transition-colors hover:bg-gray-100"
          >
            Toogle theme
          </button>
        </div>
      </header>

      {isLoading ? (
        <p className="test-sm text-center text-gray-500">Loading...</p>
      ) : (
        <SupplementList items={filtered} onOpen={handleOpen} />
      )}
      <AnimatePresence>
        {current && <SupplementDetails item={current} onClose={handleClose} />}
      </AnimatePresence>
    </main>
  );
}
