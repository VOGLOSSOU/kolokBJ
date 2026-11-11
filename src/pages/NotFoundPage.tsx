import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-4">
      <h1 className="type-title-1">Page introuvable</h1>
      <p className="text-ink-muted">Cette page n'existe pas, ou plus.</p>
      <Link to="/" className="type-body-strong text-terre-ink underline">
        Revenir à l'accueil
      </Link>
    </main>
  )
}
