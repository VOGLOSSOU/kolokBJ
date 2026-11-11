import { PagePlaceholder } from '@/components/PagePlaceholder'

export default function ValidationQueuePage() {
  return (
    <PagePlaceholder
      title="Profils à valider"
      todo={[
        'File d’attente des nouveaux profils.',
        'Valider, ou rejeter avec un motif.',
      ]}
    />
  )
}
