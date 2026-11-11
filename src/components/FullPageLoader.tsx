export function FullPageLoader() {
  return (
    <div role="status" className="grid min-h-dvh place-items-center">
      <span className="size-8 animate-spin rounded-full border-4 border-line border-t-brand" />
      <span className="sr-only">Chargement…</span>
    </div>
  )
}
