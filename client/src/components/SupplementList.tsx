import SupplementCard from './SupplementCard';
import type { Supplement } from '../types/supplement';
import { useLiveViewers } from '@/hooks/useLiveViewers';

interface Props {
  items: Supplement[];
  onOpen: (id: string) => void;
}

const SupplementList = ({ items, onOpen }: Props) => {
  const liveViewers = useLiveViewers();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <SupplementCard key={s.id} item={s} onOpen={onOpen} liveViewers={liveViewers[s.id] ?? 0} />
      ))}
    </div>
  );
};

export default SupplementList;
