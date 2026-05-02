import { memo, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { toggleLike } from '../../services/bookService.js';
import toast from 'react-hot-toast';

const BookCard = memo(({ book, index = 0 }) => {
  const { user, isLoggedIn } = useAuth();
  const { addToCart }        = useCart();
  const [liking, setLiking]  = useState(false);
  const [adding, setAdding]  = useState(false);

  const isLiked    = Boolean(book.bookLikedUser?.[user?.uid]);
  const isSeller   = book.userID === user?.uid;
  const likeCount  = book.likes || 0;

  const handleLike = async () => {
    if (!isLoggedIn) { toast.error('Sign in to like books.'); return; }
    setLiking(true);
    try { await toggleLike(book.id, user.uid); }
    catch { toast.error('Failed to update like.'); }
    finally { setLiking(false); }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) { toast.error('Sign in to add to cart.'); return; }
    if (isSeller) { toast.error("You can't buy your own book."); return; }
    setAdding(true);
    await addToCart(book.id);
    setAdding(false);
  };

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden animate-fade-up"
      style={{
        animationDelay: `${Math.min(index * 60, 600)}ms`,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 0.25s, transform 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Category badge */}
      {book.bookCategory && (
        <span
          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
        >
          {book.bookCategory}
        </span>
      )}

      {/* Like button */}
      <button
        onClick={handleLike}
        disabled={liking}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        style={{
          background: 'rgba(255,255,255,0.9)',
          boxShadow: 'var(--shadow-sm)',
        }}
        title={isLiked ? 'Unlike' : 'Like'}
      >
        <Heart
          size={14}
          style={{
            fill: isLiked ? '#e63946' : 'none',
            color: isLiked ? '#e63946' : 'var(--ink-muted)',
          }}
        />
      </button>

      {/* Book image */}
      <div
        className="h-52 flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--bg-surface)' }}
      >
        <img
          src={book.bookURL}
          alt={book.bookName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3
          className="font-semibold text-base leading-snug line-clamp-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
        >
          {book.bookName}
        </h3>
        <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
          {book.authorName}
        </p>

        <div className="flex items-center gap-1 mt-auto pt-2">
          <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>
            ❤️ {likeCount}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
          >
            ₹{book.bookPrice}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={adding || isSeller}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={
              isSeller
                ? { background: 'var(--bg-surface)', color: 'var(--ink-muted)', border: '1px solid var(--border)' }
                : { background: 'var(--accent)', color: '#fff' }
            }
            title={isSeller ? 'Your own listing' : 'Add to cart'}
          >
            {adding ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart size={14} />
            )}
            {isSeller ? 'Your Book' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
});

BookCard.displayName = 'BookCard';
export default BookCard;