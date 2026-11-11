import { useQueryClient } from '@tanstack/react-query'
import { mockSession, mockUserForStage } from '@/features/auth/mockSession'
import { SESSION_QUERY_KEY, useSession } from '@/features/auth/session'
import { stageOf, type Stage } from '@/features/auth/stage'

const OPTIONS: { value: Stage | 'admin'; label: string }[] = [
  { value: 'anonymous', label: 'Non connecté' },
  { value: 'needs-whatsapp', label: 'Sans WhatsApp' },
  { value: 'needs-profile', label: 'Sans profil' },
  { value: 'pending', label: 'En attente' },
  { value: 'rejected', label: 'Rejeté' },
  { value: 'banned', label: 'Banni' },
  { value: 'approved', label: 'Validé' },
  { value: 'admin', label: 'Validé + admin' },
]

/** Barre de dev, affichée uniquement en mode simulé : change l'étape de l'utilisateur fictif. */
export function DevBar() {
  const queryClient = useQueryClient()
  const { data: user } = useSession()

  const current = user?.role === 'ADMIN' ? 'admin' : stageOf(user ?? null)

  function change(value: Stage | 'admin') {
    const next =
      value === 'admin'
        ? { ...mockUserForStage('approved')!, role: 'ADMIN' as const }
        : mockUserForStage(value)
    mockSession.set(next)
    queryClient.setQueryData(SESSION_QUERY_KEY, next)
  }

  return (
    <label className="fixed right-2 bottom-20 z-50 flex items-center gap-2 type-caption rounded-pill bg-ink px-3 py-1 text-surface opacity-80">
      Démo
      <select
        value={current}
        onChange={(event) => change(event.target.value as Stage | 'admin')}
        className="bg-ink text-surface"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
