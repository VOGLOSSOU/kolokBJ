import { Navigate, Outlet } from 'react-router'
import { FullPageLoader } from '@/components/FullPageLoader'
import { Button } from '@/components/ui/Button'
import { useSession } from '@/features/auth/session'
import { STAGE_HOME, stageOf, type Stage } from '@/features/auth/stage'

function SessionError({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-4">
      <h1 className="type-title-1">Connexion impossible</h1>
      <p className="text-ink-muted">On n'arrive pas à joindre Kolok. Vérifie ton réseau et réessaie.</p>
      <Button onClick={onRetry}>Réessayer</Button>
    </main>
  )
}

/**
 * Ne laisse passer que les utilisateurs dont l'étape est dans `allow`.
 * Les autres sont renvoyés vers l'écran de leur étape : un profil en attente,
 * rejeté ou banni ne peut donc atteindre aucun écran de l'appli.
 * Cette garde est un confort d'interface : la vraie barrière est côté API.
 */
export function StageGate({ allow }: { allow: Stage[] }) {
  const { data: user, isPending, isError, refetch } = useSession()

  if (isPending) return <FullPageLoader />
  if (isError) return <SessionError onRetry={() => void refetch()} />

  const stage = stageOf(user)
  if (!allow.includes(stage)) return <Navigate to={STAGE_HOME[stage]} replace />

  return <Outlet />
}

/** Réserve le back-office aux admins, quel que soit l'état de leur propre profil. */
export function AdminGate() {
  const { data: user, isPending, isError, refetch } = useSession()

  if (isPending) return <FullPageLoader />
  if (isError) return <SessionError onRetry={() => void refetch()} />

  if (user?.role !== 'ADMIN') return <Navigate to={STAGE_HOME[stageOf(user)]} replace />

  return <Outlet />
}
