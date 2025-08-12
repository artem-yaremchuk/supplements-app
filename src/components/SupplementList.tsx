import SupplementCard from './SupplementCard';
import type { Supplement } from '../types/supplements';

type Props = {
  items: Supplement[];
  onOpen: (id: string) => void;
};

export default function SupplementList({ items, onOpen }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <SupplementCard key={s.id} item={s} onOpen={onOpen} />
      ))}
    </div>
  );
}
