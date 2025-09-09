import { useParams, useNavigate } from 'react-router-dom';
import { supplements } from '../mocks/supplements';
import SupplementDetails from '../components/SupplementDetails';

const SupplementDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = supplements.find((s) => s.id === id);

  return item ? (
    <main>
      <section className="p-6">
        <SupplementDetails item={item} onClose={() => navigate('/supplements')} />
      </section>
    </main>
  ) : (
    <main>
      <section className="flex flex-col items-center justify-center gap-2 p-6">
        <p className="mb-2">Supplement not found.</p>
        <button
          onClick={() => navigate('/supplements')}
          className="border-ui-border text-btn-text bg-ui-bg dark:hover:bg-hover dark:hover:border-hover hover:bg-soft-bg rounded border px-3 py-2 text-sm whitespace-nowrap transition-colors"
        >
          Back to list
        </button>
      </section>
    </main>
  );
};

export default SupplementDetailsPage;
