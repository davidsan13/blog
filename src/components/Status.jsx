export function Loading({ label = 'Loading…' }) {
  return (
    <p className="status" role="status">
      <span className="spinner" aria-hidden="true" /> {label}
    </p>
  )
}

export function ErrorMessage({ error, onRetry }) {
  return (
    <div className="status status--error" role="alert">
      <p>{error?.message ?? 'Something went wrong.'}</p>
      {onRetry && (
        <button type="button" className="btn btn--ghost" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
