import { PagePlaceholder } from '@/components/PagePlaceholder'

export default function DiscoverPage() {
  return (
    <PagePlaceholder
      title="Découvrir"
      todo={[
        'Liste des profils compatibles, triés par score de compatibilité sur 100.',
        'Filtres simples : quartier, budget, a déjà un logement.',
        'Le tri et les filtres bloquants (budget, quartier, sexe) sont calculés par l’API.',
      ]}
    />
  )
}
