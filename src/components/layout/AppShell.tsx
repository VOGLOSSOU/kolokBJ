import { Link, NavLink, Outlet } from 'react-router'
import { useSession } from '@/features/auth/session'

const TABS = [
  { to: '/decouvrir', label: 'Découvrir' },
  { to: '/demandes', label: 'Demandes' },
  { to: '/moi', label: 'Mon profil' },
]

/** Cadre de l'appli pour les profils validés : en-tête et navigation basse, pensés pour le pouce. */
export function AppShell() {
  const { data: user } = useSession()

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-line bg-surface px-5">
        <Link to="/decouvrir" className="text-lg font-bold text-brand">
          Kolok
        </Link>
        {user?.role === 'ADMIN' && (
          <Link to="/admin" className="text-sm font-semibold text-muted">
            Admin
          </Link>
        )}
      </header>

      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="mx-auto flex max-w-xl">
          {TABS.map((tab) => (
            <li key={tab.to} className="flex-1">
              <NavLink
                to={tab.to}
                className={({ isActive }) =>
                  `flex h-14 items-center justify-center text-sm font-semibold ${
                    isActive ? 'text-brand' : 'text-muted'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
