import { Button } from '@/components/ui/Button'

/** Filet de sécurité : une page qui plante ou un fichier qui ne se charge pas (réseau coupé). */
export function RouteError() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-4">
      <h1 className="type-title-1">Oups, ça a coincé</h1>
      <p className="text-ink-muted">
        La page n'a pas pu s'afficher. Vérifie ta connexion, puis recharge.
      </p>
      <Button onClick={() => window.location.reload()}>Recharger</Button>
    </main>
  )
}
