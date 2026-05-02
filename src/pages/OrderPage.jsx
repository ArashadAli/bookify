import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchUserOrders } from '../services/orderService.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

/* ── Helper ── */
const formatDate = (ts) =>
  new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

/* ── Single order card ── */
const OrderCard = ({ order }) => (
  <div
    className="rounded-2xl overflow-hidden animate-fade-up"
    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}
  >
    {/* Order header */}
    <div
      className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
      style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-surface)' }}
    >
      <div>
        <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--ink-muted)' }}>
          ORDER #{order.id.slice(-8).toUpperCase()}
        </p>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--ink-muted)' }}>
          <Calendar size={11} />
          {formatDate(order.createdAt)}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: '#dcfce7', color: '#15803d' }}
        >
          ✓ {order.paymentStatus === 'success' ? 'Paid' : order.paymentStatus}
        </span>
        <span className="text-base font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
          ₹{Number(order.total || 0).toFixed(2)}
        </span>
      </div>
    </div>

    {/* Book items */}
    <div className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
      {order.items?.map((item, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4">
          <div
            className="w-14 h-16 rounded-xl overflow-hidden shrink-0"
            style={{ background: 'var(--bg-surface)' }}
          >
            {item.bookURL ? (
              <img src={item.bookURL} alt={item.bookName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={18} style={{ color: 'var(--ink-muted)' }} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className="font-semibold text-sm line-clamp-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
            >
              {item.bookName}
            </h4>
            <p className="text-xs mt-0.5" style={{ color: 'var(--ink-muted)' }}>
              {item.authorName}
            </p>
            {item.bookCategory && (
              <span
                className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
              >
                {item.bookCategory}
              </span>
            )}
          </div>
          <span className="font-semibold text-sm shrink-0" style={{ color: 'var(--ink-primary)' }}>
            ₹{item.bookPrice}
          </span>
        </div>
      ))}
    </div>

    {/* Delivery address */}
    {order.address && (
      <div
        className="px-5 py-3 flex items-start gap-2 text-xs"
        style={{ borderTop: '1px solid var(--border-light)', color: 'var(--ink-muted)' }}
      >
        <MapPin size={12} className="shrink-0 mt-0.5" />
        <span>
          {order.address.name} — {order.address.street}, {order.address.city},{' '}
          {order.address.state} {order.address.pincode}
        </span>
      </div>
    )}
  </div>
);

/* ── OrdersPage ── */
const OrdersPage = () => {
  const { user }   = useAuth();
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchUserOrders(user.uid);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
            >
              My Orders
            </h1>
            {!loading && (
              <p className="text-sm mt-0.5" style={{ color: 'var(--ink-muted)' }}>
                {orders.length} order{orders.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm no-underline transition-colors font-medium"
            style={{ color: 'var(--ink-muted)' }}
          >
            <ArrowLeft size={14} /> Home
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner label="Fetching your orders…" />
        ) : error ? (
          <div
            className="rounded-xl p-5 text-sm text-center"
            style={{ background: '#fef2f2', color: 'var(--error)', border: '1px solid #fca5a5' }}
          >
            {error}
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No orders yet"
            description="When you purchase books, your orders will appear here."
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
          <div className="space-y-5">
            {orders.map((order, i) => (
              <div key={order.id} style={{ animationDelay: `${i * 80}ms` }}>
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;