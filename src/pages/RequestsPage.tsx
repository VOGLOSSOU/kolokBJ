import { PagePlaceholder } from '@/components/PagePlaceholder'

export default function RequestsPage() {
  return (
    <PagePlaceholder
      title="Demandes"
      todo={[
        'Demandes reçues : accepter ou refuser.',
        'Demandes envoyées et leur état.',
        'Demande acceptée : numéro WhatsApp révélé, avec lien direct vers la discussion.',
        'Relance à 7 jours : « Vous êtes en coloc ? ».',
      ]}
    />
  )
}
