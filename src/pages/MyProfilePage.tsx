import { PagePlaceholder } from '@/components/PagePlaceholder'
import { Button } from '@/components/ui/Button'
import { useLogout, useSession } from '@/features/auth/session'
import { formatBeninPhone } from '@/lib/format'

export default function MyProfilePage() {
  const { data: user } = useSession()
  const { mutate: logout, isPending } = useLogout()

  return (
    <>
      <PagePlaceholder
        title={user?.firstName ?? 'Mon profil'}
        todo={[
          'Aperçu de mon profil tel que les autres le voient.',
          'Modifier mon profil.',
          'Bouton « Supprimer mon compte » qui efface toutes les données personnelles.',
        ]}
      />
      <div className="flex flex-col gap-3 px-4">
        {user?.whatsapp && (
          <p className="type-small text-ink-muted">WhatsApp : {formatBeninPhone(user.whatsapp)}</p>
        )}
        <Button variant="secondary" onClick={() => logout()} disabled={isPending}>
          Se déconnecter
        </Button>
      </div>
    </>
  )
}
