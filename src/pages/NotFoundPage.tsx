import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-5">
      <h1 className="text-2xl font-bold">Page introuvable</h1>
      <p className="text-muted">Cette page n'existe pas, ou plus.</p>
      <Link to="/" className="font-semibold text-brand underline">
        Revenir à l'accueil
      </Link>
    </main>
  )
}
