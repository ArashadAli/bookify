import { useOutletContext } from 'react-router-dom';
import BookCard from './BookCard.jsx';
import { SkeletonGrid } from '../common/SkeletonCard.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { Link } from 'react-router-dom';

const BooksGrid = () => {
  const { filteredBooks, booksLoading, clearFilters, searchQuery, category } =
    useOutletContext();

  if (booksLoading) return <SkeletonGrid />;

  if (filteredBooks.length === 0) {
    const hasFilters = searchQuery.trim() || category !== 'All';
    return (
      <EmptyState
        icon="🔍"
        title={hasFilters ? 'No books found' : 'No books yet'}
        description={
          hasFilters
            ? `No results for "${searchQuery}" in ${category === 'All' ? 'all categories' : category}.`
            : 'Be the first to list a book for sale!'
        }
        action={
          hasFilters ? (
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              Clear Filters
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-xl font-semibold text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              Sell a Book
            </Link>
          )
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {filteredBooks.map((book, i) => (
        <BookCard key={book.id} book={book} index={i} />
      ))}
    </div>
  );
};

export default BooksGrid;