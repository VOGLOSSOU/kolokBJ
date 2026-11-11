import { Link, NavLink, Outlet } from 'react-router'

const SECTIONS = [
  { to: '/admin', label: 'À valider', end: true },
  { to: '/admin/signalements', label: 'Signalements', end: false },
  { to: '/admin/tableau-de-bord', label: 'Tableau de bord', end: false },
  { to: '/admin/journal', label: 'Journal', end: false },
]

export default function AdminLayout() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col">
      <header className="border-b border-line bg-surface">
        <div className="flex h-14 items-center justify-between px-5">
          <p className="text-lg font-bold text-brand">Kolok · Admin</p>
          <Link to="/" className="text-sm font-semibold text-muted">
            Retour à l'appli
          </Link>
        </div>
        <nav aria-label="Sections du back-office" className="overflow-x-auto">
          <ul className="flex gap-1 px-3">
            {SECTIONS.map((section) => (
              <li key={section.to}>
                <NavLink
                  to={section.to}
                  end={section.end}
                  className={({ isActive }) =>
                    `block border-b-2 px-3 py-3 text-sm font-semibold whitespace-nowrap ${
                      isActive ? 'border-brand text-brand' : 'border-transparent text-muted'
                    }`
                  }
                >
                  {section.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
