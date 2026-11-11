import { PagePlaceholder } from '@/components/PagePlaceholder'

export default function ReportsPage() {
  return (
    <PagePlaceholder
      title="Signalements"
      todo={[
        'File des signalements, avec l’historique de chaque compte.',
        'Suspendre, bannir définitivement ou rétablir un compte.',
      ]}
    />
  )
}
