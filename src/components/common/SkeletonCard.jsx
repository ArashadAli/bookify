const SkeletonCard = () => (
  <div
    className="rounded-2xl overflow-hidden"
    style={{ background: 'var(--bg-elevated)', boxShadow: 'var(--shadow-sm)' }}
  >
    {/* Image placeholder */}
    <div
      className="h-48 animate-shimmer"
      style={{ background: 'var(--bg-surface)' }}
    />
    {/* Content */}
    <div className="p-4 space-y-3">
      <div className="h-4 rounded animate-shimmer" style={{ width: '75%', background: 'var(--bg-surface)' }} />
      <div className="h-3 rounded animate-shimmer" style={{ width: '55%', background: 'var(--bg-surface)' }} />
      <div className="h-3 rounded animate-shimmer" style={{ width: '40%', background: 'var(--bg-surface)' }} />
      <div className="flex justify-between items-center pt-2">
        <div className="h-5 rounded animate-shimmer" style={{ width: '30%', background: 'var(--bg-surface)' }} />
        <div className="h-8 rounded-xl animate-shimmer" style={{ width: '35%', background: 'var(--bg-surface)' }} />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;