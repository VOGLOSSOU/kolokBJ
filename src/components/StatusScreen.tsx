import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { useLogout } from '@/features/auth/session'

type StatusScreenProps = {
  title: string
  children: ReactNode
  /** Boutons d'action propres à l'écran, affichés au-dessus de « Se déconnecter ». */
  actions?: ReactNode
}

/** Écran plein, centré, pour les étapes où l'utilisateur n'a pas accès à l'appli. */
export function StatusScreen({ title, children, actions }: StatusScreenProps) {
  const { mutate: logout, isPending } = useLogout()

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-5 py-10">
      <p className="text-lg font-bold text-brand">Kolok</p>
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex flex-col gap-3 text-muted">{children}</div>
      <div className="flex flex-col gap-3">
        {actions}
        <Button variant="ghost" onClick={() => logout()} disabled={isPending}>
          Se déconnecter
        </Button>
      </div>
    </main>
  )
}
