import { StatusScreen } from '@/components/StatusScreen'

export default function PendingPage() {
  return (
    <StatusScreen title="Ton profil est en cours de vérification">
      <p>
        Un membre de l'équipe relit chaque nouveau profil à la main. C'est ce qui garde Kolok sans
        agents ni démarcheurs.
      </p>
      <p>Tu recevras une réponse en moins de 24 h.</p>
    </StatusScreen>
  )
}
