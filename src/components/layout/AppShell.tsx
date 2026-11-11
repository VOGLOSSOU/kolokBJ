import { Inbox, Search, UserRound, type LucideIcon } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router'
import { Logo } from '@/components/Logo'
import { useSession } from '@/features/auth/session'

const TABS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/decouvrir', label: 'Découvrir', icon: Search },
  { to: '/demandes', label: 'Demandes', icon: Inbox },
  { to: '/moi', label: 'Mon profil', icon: UserRound },
]

/** Cadre de l'appli pour les profils validés : en-tête et navigation basse, pensés pour le pouce. */
export function AppShell() {
  const { data: user } = useSession()

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-line bg-surface px-4">
        <Link to="/decouvrir" aria-label="Kolok, retour à Découvrir">
          <Logo />
        </Link>
        {user?.role === 'ADMIN' && (
          <Link to="/admin" className="type-body-strong text-terre-ink">
            Admin
          </Link>
        )}
      </header>

      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface-raised pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="mx-auto flex max-w-xl">
          {TABS.map(({ to, label, icon: Icon }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `type-caption flex h-16 flex-col items-center justify-center gap-1 ${
                    isActive ? 'text-terre-ink' : 'text-ink'
                  }`
                }
              >
                <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
