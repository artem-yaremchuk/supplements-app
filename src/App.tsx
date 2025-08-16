import { useState, useMemo } from 'react';
import { supplements } from './mocks/supplements';
import SupplementList from './components/SupplementList';
import SupplementDetails from './components/SupplementDetails';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedSupplementId, setSelectedSupplementId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return supplements;

    return supplements.filter((s) =>
      [s.name, s.shortDesc, ...s.mechanisms].some((v) => v.toLowerCase().includes(q)),
    );
  }, [query]);

  const handleOpen = (id: string) => setSelectedSupplementId(id);
  const handleClose = () => setSelectedSupplementId(null);

  const current = supplements.find((s) => s.id === selectedSupplementId) || null;

  return (
    <main className="mx-auto max-w-full space-y-6 p-6">
      <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Supplements encyclopedia</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, mechanism..."
          className="focus:border-accent w-full rounded border border-gray-300 px-3 py-2 transition-colors outline-none sm:w-80"
        />
      </header>

      <SupplementList items={filtered} onOpen={handleOpen} />
      <AnimatePresence>
        {current && <SupplementDetails item={current} onClose={handleClose} />}
      </AnimatePresence>
    </main>
  );
}
