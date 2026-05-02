import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-10 px-8 py-12 md:px-14"
      style={{
        background: 'linear-gradient(135deg, var(--ink-primary) 0%, var(--ink-secondary) 60%, #6B4423 100%)',
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'var(--accent-light)' }}
      />
      <div
        className="absolute -bottom-8 right-24 w-40 h-40 rounded-full opacity-10"
        style={{ background: 'var(--accent)' }}
      />

      <div className="relative z-10 max-w-lg">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: 'var(--accent-light)', fontFamily: 'var(--font-ui)' }}
        >
          India's Secondhand Book Marketplace
        </p>
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Every book has a second story to tell.
        </h1>
        <p className="text-base mb-8 opacity-75 text-white" style={{ fontFamily: 'var(--font-body)' }}>
          Discover affordable pre-loved books or earn by selling yours. Thousands of titles, hand-picked by readers like you.
        </p>
        <div className="flex flex-wrap gap-3">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="no-underline px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Sell Your Books
            </Link>
          ) : (
            <Link
              to="/signup"
              className="no-underline px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Start Selling
            </Link>
          )}
          <a
            href="#browse"
            className="no-underline px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            Browse Books ↓
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;