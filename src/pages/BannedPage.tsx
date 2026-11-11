import { StatusScreen } from '@/components/StatusScreen'

export default function BannedPage() {
  return (
    <StatusScreen title="Ce compte a été banni">
      <p>
        Ce compte n'a plus accès à Kolok, suite à une violation des règles de la communauté.
      </p>
    </StatusScreen>
  )
}
