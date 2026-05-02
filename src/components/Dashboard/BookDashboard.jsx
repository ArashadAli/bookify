import { Trash2, Heart } from 'lucide-react';

const DashboardBookCard = ({ book, onDelete }) => (
  <div className="group relative flex flex-col rounded-2xl overflow-hidden border border-[var(--border-light)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300">

    {/* ── Image ── */}
    <div className="relative h-48 overflow-hidden bg-[var(--bg-surface)]">
      <img
        src={book.bookURL}
        alt={book.bookName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      {/* Dark gradient at bottom for badge readability */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Delete button — appears on hover */}
      <button
        onClick={() => onDelete(book.id)}
        title="Delete listing"
        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-xl bg-white/90 text-[var(--error)] flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105 transition-all duration-200 shadow-[var(--shadow-sm)]"
      >
        <Trash2 size={14} />
      </button>

      {/* Category badge */}
      {book.bookCategory && (
        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--accent-subtle)] text-[var(--accent)]">
          {book.bookCategory}
        </span>
      )}
    </div>

    {/* ── Content ── */}
    <div className="flex flex-col flex-1 p-4 gap-3">

      {/* Title + Author */}
      <div>
        <h3
          className="text-sm font-semibold leading-snug line-clamp-1 text-[var(--ink-primary)] mb-0.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {book.bookName}
        </h3>
        <p className="text-xs text-[var(--ink-muted)] line-clamp-1">
          {book.authorName}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border-light)]" />

      {/* Price + Likes */}
      <div className="flex items-center justify-between">
        <span
          className="text-lg font-bold text-[var(--accent)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ₹{book.bookPrice}
        </span>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-light)]">
          <Heart size={11} className="text-rose-400 fill-rose-400" />
          <span className="text-xs font-medium text-[var(--ink-muted)]">
            {book.likes || 0}
          </span>
        </div>
      </div>

    </div>
  </div>
);

export default DashboardBookCard;