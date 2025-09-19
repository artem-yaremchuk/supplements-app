import type { Supplement } from '../types/supplements';

interface Props {
  item: Supplement;
  onOpen: (id: string) => void;
}

const SupplementCard = ({ item, onOpen }: Props) => {
  return (
    <div
      className="cursor-pointer rounded-xl border p-4 shadow-sm transition hover:shadow-md"
      onClick={() => onOpen(item.id)}
    >
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-secondary-text mt-1 text-sm">{item.shortDesc}</p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {item.mechanisms.map((m, index) => (
          <li key={index} className="bg-soft-bg rounded px-2 py-0.5 text-xs">
            {m}
          </li>
        ))}
      </ul>

      <div className="mt-3 text-xs font-bold">
        Evidence: <span className="font-medium">{item.evidence}</span>
      </div>
    </div>
  );
};

export default SupplementCard;
