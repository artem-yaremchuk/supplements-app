import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero.jpg';

const HomePage = () => {
  return (
    <main>
      <section
        className="relative flex items-center justify-center bg-cover bg-center px-6 py-52 text-center text-white sm:py-66"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-overlay-bg absolute inset-0" /> {/* overlay */}
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Discover evidence-based supplements</h1>
          <p className="text-lg">Search, compare and explore science-backed ingredients</p>
          <Link
            to="/supplements"
            className="bg-link-bg hover:bg-link-bg-hover inline-block rounded-md px-6 py-3 text-sm font-semibold transition-colors"
          >
            Browse Supplements
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
