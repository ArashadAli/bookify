import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, LogOut, Menu, X, BookOpen, Package, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { CATEGORIES } from '../../hooks/useBooks.js';

const HomeNavbar = ({ searchQuery, setSearchQuery, category, setCategory }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartCount }                = useCart();
  const navigate                     = useNavigate();

  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [userMenuOpen,  setUserMenuOpen]  = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const firstName = user?.displayName?.split(' ')[0] || 'Account';
  const initials  = (user?.displayName || 'U').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-elevated)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-[var(--shadow-sm)]'
          : 'bg-[var(--bg-base)] border-b border-transparent'
      }`}
    >
      {/* ── Top bar ── */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 no-underline group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--accent-subtle)] group-hover:bg-[var(--accent)] transition-colors duration-200">
            <BookOpen size={16} className="text-[var(--accent)] group-hover:text-white transition-colors duration-200" />
          </div>
          <span
            className="text-xl font-bold tracking-tight text-[var(--ink-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Bookify
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 mx-6 lg:mx-10">
          <div className={`flex items-center w-full h-10 gap-2 px-4 rounded-xl bg-[var(--bg-surface)] border transition-colors duration-200 ${
            searchFocused ? 'border-[var(--accent)]' : 'border-[var(--border)]'
          }`}>
            <Search size={15} className="text-[var(--ink-muted)] shrink-0" />
            <input
              type="text"
              placeholder="Search by title, author, or category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 min-w-0 bg-transparent text-sm outline-none border-none text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="flex items-center justify-center w-4 h-4 rounded-full bg-[var(--border)] text-[var(--ink-muted)] hover:bg-[var(--ink-muted)] hover:text-white transition-colors shrink-0"
              >
                <X size={10} />
              </button>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">

          {/* Cart */}
          {isLoggedIn && (
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-9 h-9 rounded-xl text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] transition-colors no-underline"
              title="My Cart"
            >
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Auth — logged in */}
          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-200"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full object-cover shrink-0" />
                ) : (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ background: 'var(--accent)' }}
                  >
                    {initials}
                  </div>
                )}
                <span className="hidden sm:inline text-sm font-medium text-[var(--ink-secondary)]">
                  {firstName}
                </span>
                <ChevronDown
                  size={13}
                  className={`hidden sm:block text-[var(--ink-muted)] transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* ── Dropdown ── */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden z-50 animate-fade-up bg-[var(--bg-elevated)] border border-[var(--border)] shadow-[var(--shadow-lg)]">

                  {/* User info header */}
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-[var(--bg-surface)] border-b border-[var(--border-light)]">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="avatar" className="w-9 h-9 rounded-full object-cover shrink-0" />
                    ) : (
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                        style={{ background: 'var(--accent)' }}
                      >
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--ink-primary)] truncate leading-tight">
                        {user?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-[var(--ink-muted)] truncate mt-0.5 leading-tight">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="py-1.5">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm no-underline text-[var(--ink-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] group-hover:bg-[var(--accent-subtle)] transition-colors shrink-0">
                        <LayoutDashboard size={13} className="text-[var(--ink-muted)] group-hover:text-[var(--accent)]" />
                      </div>
                      <span className="font-medium">My Dashboard</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm no-underline text-[var(--ink-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] group-hover:bg-[var(--accent-subtle)] transition-colors shrink-0">
                        <Package size={13} className="text-[var(--ink-muted)] group-hover:text-[var(--accent)]" />
                      </div>
                      <span className="font-medium">My Orders</span>
                    </Link>
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-[var(--border-light)] py-1.5">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors hover:bg-red-50 group"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[var(--bg-surface)] group-hover:bg-red-100 transition-colors shrink-0">
                        <LogOut size={13} className="text-[var(--error)]" />
                      </div>
                      <span className="font-medium text-[var(--error)]">Sign Out</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium no-underline text-[var(--ink-secondary)] border border-[var(--border)] hover:bg-[var(--bg-surface)] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl text-sm font-semibold no-underline text-white hover:opacity-90 transition-opacity"
                style={{ background: 'var(--accent)' }}
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Category bar (desktop) ── */}
      <div className="hidden md:block border-t border-[var(--border-light)]">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 h-11 flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                category === cat
                  ? 'text-white shadow-sm'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-surface)]'
              }`}
              style={category === cat ? { background: 'var(--accent)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-elevated)] animate-fade-up">
          {/* Mobile search */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center h-10 gap-2 px-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)]">
              <Search size={15} className="text-[var(--ink-muted)] shrink-0" />
              <input
                type="text"
                placeholder="Search books…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-sm outline-none border-none text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
              />
            </div>
          </div>

          {/* Mobile categories */}
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setMobileOpen(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  category === cat
                    ? 'text-white'
                    : 'bg-[var(--bg-surface)] text-[var(--ink-muted)] border border-[var(--border)]'
                }`}
                style={category === cat ? { background: 'var(--accent)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeNavbar;