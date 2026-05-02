import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

const CartPage = () => {
  const { cartItems, cartTotal, cartLoading, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartLoading) return <LoadingSpinner fullPage label="Loading cart…" />;

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
            >
              Your Cart
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--ink-muted)' }}>
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            to="/"
            className="text-sm no-underline font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            ← Continue browsing
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            description="Add some books to your cart to get started."
            action={
              <Link
                to="/"
                className="px-6 py-2.5 rounded-xl font-semibold text-white no-underline hover:opacity-90 transition-opacity"
                style={{ background: 'var(--accent)' }}
              >
                Browse Books
              </Link>
            }
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items list */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.cartDocId}
                  className="flex gap-4 rounded-2xl p-4 animate-fade-up"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {/* Book image */}
                  <div
                    className="w-20 h-24 rounded-xl overflow-hidden shrink-0"
                    style={{ background: 'var(--bg-surface)' }}
                  >
                    <img
                      src={item.bookURL}
                      alt={item.bookName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-base leading-snug line-clamp-1"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
                    >
                      {item.bookName}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--ink-muted)' }}>
                      {item.authorName}
                    </p>
                    {item.bookCategory && (
                      <span
                        className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
                      >
                        {item.bookCategory}
                      </span>
                    )}
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <span
                      className="text-lg font-bold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
                    >
                      ₹{item.bookPrice}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.cartDocId)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                      style={{ color: 'var(--error)' }}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-72 shrink-0">
              <div
                className="rounded-2xl p-6 sticky top-6"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h2
                  className="text-lg font-bold mb-5"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
                >
                  Order Summary
                </h2>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.cartDocId} className="flex justify-between text-sm">
                      <span className="truncate mr-2" style={{ color: 'var(--ink-secondary)' }}>
                        {item.bookName}
                      </span>
                      <span className="shrink-0 font-medium" style={{ color: 'var(--ink-primary)' }}>
                        ₹{item.bookPrice}
                      </span>
                    </div>
                  ))}
                </div>
                <hr className="my-4" style={{ borderColor: 'var(--border)' }} />
                <div className="flex justify-between font-bold">
                  <span style={{ color: 'var(--ink-primary)' }}>Total</span>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-5 py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                  style={{ background: 'var(--accent)' }}
                >
                  Proceed to Checkout <ArrowRight size={15} />
                </button>
                <p className="text-center text-xs mt-3" style={{ color: 'var(--ink-muted)' }}>
                  🔒 Secure checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;