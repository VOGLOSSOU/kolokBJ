export function FullPageLoader() {
  return (
    <div role="status" className="grid min-h-dvh place-items-center">
      <span className="size-8 animate-spin rounded-pill border-4 border-line border-t-terre" />
      <span className="sr-only">Chargement…</span>
    </div>
  )
}
