import { useState, useMemo } from 'react';
import { supplements } from './mocks/supplements';
import SupplementList from './components/SupplementList';

export default function App() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return supplements;

    return supplements.filter((s) =>
      [s.name, s.shortDesc, ...s.mechanisms].some((v) => v.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <main className="mx-auto max-w-full space-y-6 p-6">
      <header className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Supplements</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, mechanism..."
          className="w-full rounded border px-3 py-2 sm:w-80"
        />
      </header>

      <SupplementList
        items={filtered}
        onOpen={(id) => {
          alert(`Open details for: ${id}`);
        }}
      />
    </main>
  );
}
