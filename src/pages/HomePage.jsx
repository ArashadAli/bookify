import { useOutletContext } from 'react-router-dom';
import HeroBanner from '../components/home/HeroBanner.jsx';
import BooksGrid from '../components/home/BookGrid.jsx';

const HomePage = () => {
  const ctx = useOutletContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroBanner />

      {/* Section heading */}
      <div id="browse" className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
            >
              {ctx.category !== 'All' ? ctx.category : 'All Books'}
            </h2>
            {ctx.searchQuery && (
              <p className="text-sm mt-0.5" style={{ color: 'var(--ink-muted)' }}>
                Results for &ldquo;{ctx.searchQuery}&rdquo;
              </p>
            )}
          </div>
          <span className="text-sm" style={{ color: 'var(--ink-muted)' }}>
            {ctx.filteredBooks.length} book{ctx.filteredBooks.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <BooksGrid />
    </div>
  );
};

export default HomePage;