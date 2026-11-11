import { PagePlaceholder } from '@/components/PagePlaceholder'

export default function ProfileDetailPage() {
  return (
    <PagePlaceholder
      title="Profil"
      todo={[
        'Détail du profil : identité, études, situation, logement, budget, rythme de vie, bio.',
        'Score de compatibilité.',
        'Bouton « Proposer une coloc » avec un court message (10 demandes par jour).',
        'Bouton « Signaler » avec motif.',
      ]}
    />
  )
}
