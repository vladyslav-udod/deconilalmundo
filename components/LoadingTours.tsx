export default function LoadingTours() {
  return (
    <div className="types-loading" role="status" aria-live="polite">
      <span className="types-spinner" aria-hidden="true" />
      <span className="types-loading-text">Cargando viajes…</span>
    </div>
  );
}
