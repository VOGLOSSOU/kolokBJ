import { PagePlaceholder } from '@/components/PagePlaceholder'

export default function AuditLogPage() {
  return (
    <PagePlaceholder
      title="Journal des actions"
      todo={[
        'Qui a validé, rejeté ou banni, et quand.',
      ]}
    />
  )
}
