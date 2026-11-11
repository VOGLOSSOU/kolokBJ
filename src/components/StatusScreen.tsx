import type { ReactNode } from 'react'
import { Logo } from '@/components/Logo'
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
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-4 py-8">
      <Logo />
      <h1 className="type-title-1">{title}</h1>
      <div className="flex flex-col gap-3 text-ink-muted">{children}</div>
      <div className="flex flex-col gap-3">
        {actions}
        <Button variant="ghost" onClick={() => logout()} disabled={isPending}>
          Se déconnecter
        </Button>
      </div>
    </main>
  )
}
