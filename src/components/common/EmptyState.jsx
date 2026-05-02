const EmptyState = ({ icon = '📚', title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-up">
    <span className="text-6xl mb-5 select-none">{icon}</span>
    <h3
      className="text-2xl font-semibold mb-2"
      style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
    >
      {title}
    </h3>
    {description && (
      <p className="text-base max-w-sm" style={{ color: 'var(--ink-muted)' }}>
        {description}
      </p>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;