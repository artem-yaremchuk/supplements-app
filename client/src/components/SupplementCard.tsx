import type { Supplement } from '../types/supplement';
import { useAppSelector } from '../hooks/hooks';
import { useToggleFavoriteMutation } from '../redux/user/userApi';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Heart, Eye } from 'lucide-react';

interface Props {
  item: Supplement;
  onOpen: (id: string) => void;
  liveViewers: number;
}

const SupplementCard = ({ item, onOpen, liveViewers }: Props) => {
  const formattedEvidence = item.evidence.charAt(0) + item.evidence.slice(1).toLowerCase();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [toggleFavorite, { isLoading: isToogling }] = useToggleFavoriteMutation();

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (isToogling) return;

    await toggleFavorite(item.id);
  };

  return (
    <div
      className="cursor-pointer rounded-xl border p-4 shadow-sm transition hover:shadow-md"
      onClick={() => onOpen(item.id)}
    >
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{item.name}</h3>

        {isLoggedIn && (
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="border-ui-border bg-ui-bg hover:bg-soft-bg flex h-8 w-8 items-center justify-center rounded-full border transition disabled:opacity-60"
            disabled={isToogling}
          >
            {item.isFavorite ? (
              <Heart size={18} fill="var(--color-accent)" stroke="var(--color-accent)" />
            ) : (
              <Heart size={18} stroke="var(--color-secondary-text)" />
            )}
          </button>
        )}
      </div>

      <p className="text-secondary-text mt-1 text-sm">{item.shortDesc}</p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {item.mechanisms.map((m, index) => (
          <li key={index} className="bg-soft-bg rounded px-2 py-0.5 text-xs">
            {m}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="font-bold">
          Evidence: <span className="font-medium">{formattedEvidence}</span>
        </div>

        <div className="flex items-center gap-1 transition-opacity hover:opacity-80">
          <Eye size={22} strokeWidth={1} />
          <p className="text-secondary-text">{liveViewers} people viewing now</p>
        </div>
      </div>
    </div>
  );
};

export default SupplementCard;
