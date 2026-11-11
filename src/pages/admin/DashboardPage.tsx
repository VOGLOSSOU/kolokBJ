import { PagePlaceholder } from '@/components/PagePlaceholder'

export default function DashboardPage() {
  return (
    <PagePlaceholder
      title="Tableau de bord"
      todo={[
        'Inscrits, vérifiés, demandes envoyées, acceptées, colocs confirmées.',
      ]}
    />
  )
}
