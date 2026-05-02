import { useState, useEffect, useCallback } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchUserBooks, deleteBook } from '../services/bookService.js';
import { subscribeToUserProfile } from '../services/userService.js';
import DashboardSidebar from '../components/dashboard/Sidebar.jsx';
import DashboardNavbar from '../components/dashboard/Navbar.jsx';
import DashboardBookCard from '../components/dashboard/BookDashboard.jsx';
import AddBookModal from '../components/dashboard/AddBookModal.jsx';
import { SkeletonGrid } from '../components/common/SkeletonCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useDebounce } from '../hooks/useDebounce.js';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile,  setUserProfile]  = useState(null);
  const [books,        setBooks]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [addOpen,      setAddOpen]      = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const debouncedQ = useDebounce(searchQuery, 300);

  // Real-time profile subscription
  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToUserProfile(user.uid, setUserProfile);
    return unsub;
  }, [user]);

  // Fetch user's books
  const loadBooks = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchUserBooks(user.uid);
      setBooks(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load your books.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { loadBooks(); }, [loadBooks]);

  const handleDelete = async (bookId) => {
    if (!window.confirm('Delete this book listing?')) return;
    try {
      await deleteBook(user.uid, bookId);
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      toast.success('Book removed.');
    } catch {
      toast.error('Failed to delete book.');
    }
  };

  // Client-side search filter
  const filtered = books.filter((b) =>
    !debouncedQ ||
    b.bookName?.toLowerCase().includes(debouncedQ.toLowerCase()) ||
    b.authorName?.toLowerCase().includes(debouncedQ.toLowerCase())
  );

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 overflow-auto">
        <DashboardNavbar
          onMenuToggle={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userProfile={userProfile}
        />

        <main className="flex-1 px-4 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
              >
                My Books
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--ink-muted)' }}>
                {books.length} listing{books.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              <Plus size={16} /> Add Book
            </button>
          </div>

          {/* Books */}
          {loading ? (
            <SkeletonGrid count={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon="📖"
              title={books.length === 0 ? "No books listed yet" : "No results"}
              description={
                books.length === 0
                  ? "Start by listing a book you'd like to sell."
                  : `Nothing matches "${searchQuery}".`
              }
              action={
                books.length === 0 && (
                  <button
                    onClick={() => setAddOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    style={{ background: 'var(--accent)' }}
                  >
                    <Plus size={16} /> List Your First Book
                  </button>
                )
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((book) => (
                <DashboardBookCard key={book.id} book={book} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>
      </div>

      {addOpen && (
        <AddBookModal onClose={() => setAddOpen(false)} onSuccess={loadBooks} />
      )}
    </div>
  );
};

export default DashboardPage;