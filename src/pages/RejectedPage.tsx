import { useNavigate } from 'react-router'
import { StatusScreen } from '@/components/StatusScreen'
import { Button } from '@/components/ui/Button'
import { useSession } from '@/features/auth/session'

export default function RejectedPage() {
  const navigate = useNavigate()
  const { data: user } = useSession()

  return (
    <StatusScreen
      title="Ton profil n'a pas été validé"
      actions={<Button onClick={() => navigate('/profil/corriger')}>Corriger mon profil</Button>}
    >
      {user?.rejectionReason && (
        <p className="rounded-md border border-line bg-surface-raised p-4 text-ink">
          <span className="type-caption block text-ink-muted">Motif</span>
          {user.rejectionReason}
        </p>
      )}
      <p>Corrige ton profil et renvoie-le : il sera relu.</p>
    </StatusScreen>
  )
}
