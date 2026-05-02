/**
 * LoadingSpinner
 * @param {boolean} fullPage — centers spinner in the full viewport
 * @param {string}  size     — 'sm' | 'md' | 'lg'
 */
const LoadingSpinner = ({ fullPage = false, size = 'md', label = 'Loading…' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} border-[3px] rounded-full animate-spin`}
        style={{
          borderColor: 'var(--border)',
          borderTopColor: 'var(--accent)',
        }}
        role="status"
        aria-label={label}
      />
      {label && (
        <span
          className="text-sm"
          style={{ color: 'var(--ink-muted)', fontFamily: 'var(--font-ui)' }}
        >
          {label}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: 'var(--bg-base)' }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;