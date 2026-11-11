import { PagePlaceholder } from '@/components/PagePlaceholder'

export default function ProfileFormPage() {
  return (
    <PagePlaceholder
      title="Mon profil colocataire"
      todo={[
        'Prénom, photo, âge, sexe, université et campus, filière, année d’étude.',
        'Situation : « J’ai déjà un logement » ou « Je cherche un coloc pour louer ensemble ».',
        'Si logement : quartier, type, loyer total, part demandée, date de disponibilité.',
        'Budget maximum en FCFA, quartiers souhaités, préférence de sexe du coloc.',
        'Rythme de vie : réveil, coucher, révisions jour ou nuit, invités, propreté, fumeur.',
        'Courte bio libre.',
      ]}
    />
  )
}
