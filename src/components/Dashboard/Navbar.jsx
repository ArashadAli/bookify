import { useState } from 'react';
import { Menu, Bell, Search, X, BookOpen, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import ProfileModal from './ProfileModal.jsx';

const DashboardNavbar = ({ onMenuToggle, searchQuery, setSearchQuery, userProfile }) => {
  const { user } = useAuth();
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const displayName =
    userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'User';
  const avatarUrl = userProfile?.profile_url || user?.photoURL;
  const initials  = displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 lg:px-8 bg-[var(--bg-elevated)] border-b border-[var(--border-light)] shadow-[var(--shadow-sm)]">

        {/* ── Hamburger (mobile/tablet) ── */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* ── Brand (mobile only, hidden when search open) ── */}
        {!mobileSearch && (
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            <BookOpen size={18} className="text-[var(--accent)]" />
            <span
              className="font-bold text-base text-[var(--ink-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Bookify
            </span>
          </div>
        )}

        {/* ── Desktop Search Bar ── */}
        <div className="hidden sm:flex flex-1 max-w-sm">
          <div className="flex items-center w-full h-9 gap-2 px-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] focus-within:border-[var(--accent)] transition-colors">
            <Search size={14} className="text-[var(--ink-muted)] shrink-0" />
            <input
              type="text"
              placeholder="Search my books…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-sm outline-none text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
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

        {/* ── Mobile Full-Width Search Overlay ── */}
        {mobileSearch && (
          <div className="absolute inset-0 z-40 flex items-center gap-3 px-4 bg-[var(--bg-elevated)] sm:hidden">
            <div className="flex items-center flex-1 h-9 gap-2 px-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--accent)]">
              <Search size={14} className="text-[var(--ink-muted)] shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search my books…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-sm outline-none text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
              />
            </div>
            <button
              onClick={() => { setMobileSearch(false); setSearchQuery(''); }}
              className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* ── Push right actions to end ── */}
        <div className="flex-1" />

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-1.5">

          {/* Mobile search icon */}
          {!mobileSearch && (
            <button
              onClick={() => setMobileSearch(true)}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          )}

          {/* Notification Bell */}
          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-xl text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={17} />
            {/* unread dot */}
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg-elevated)]" />
          </button>

          {/* Vertical divider */}
          <div className="w-px h-5 bg-[var(--border)] mx-1 shrink-0" />

          {/* Profile Button */}
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-200 group"
            title="Edit profile"
          >
            {/* Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-7 h-7 rounded-full object-cover shrink-0 ring-2 ring-[var(--border)] group-hover:ring-[var(--accent-light)] transition-all"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white text-xs font-bold flex items-center justify-center shrink-0 tracking-wide">
                {initials}
              </div>
            )}

            {/* Name + subtitle (md+) */}
            <div className="hidden md:flex flex-col items-start leading-none gap-0.5">
              <span className="text-xs font-semibold text-[var(--ink-primary)] max-w-[110px] truncate leading-tight">
                {displayName}
              </span>
              <span className="text-[11px] text-[var(--ink-muted)] leading-tight">
                View profile
              </span>
            </div>

            <ChevronDown
              size={13}
              className="hidden md:block text-[var(--ink-muted)] shrink-0 group-hover:text-[var(--accent)] transition-colors"
            />
          </button>
        </div>
      </header>

      {profileOpen && (
        <ProfileModal onClose={() => setProfileOpen(false)} userProfile={userProfile} />
      )}
    </>
  );
};

export default DashboardNavbar;