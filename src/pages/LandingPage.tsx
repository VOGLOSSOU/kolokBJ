import { Link } from 'react-router'
import { GoogleSignInButton } from '@/features/auth/GoogleSignInButton'

const PROMISES = [
  'Réservé aux étudiants : pas d’agents, pas de démarcheurs.',
  'Chaque profil est relu à la main avant d’être visible.',
  'Tu vois d’abord les étudiants compatibles avec ton budget, ton quartier et ton rythme de vie.',
]

/** Contenu provisoire : le texte et la mise en page définitifs viendront avec le design. */
export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-8 px-5 py-10">
      <div className="flex flex-col gap-3">
        <p className="text-lg font-bold text-brand">Kolok</p>
        <h1 className="text-3xl leading-tight font-bold">
          Trouve un coloc étudiant fiable, et partage ton loyer en confiance.
        </h1>
      </div>

      <ul className="flex flex-col gap-3 text-muted">
        {PROMISES.map((promise) => (
          <li key={promise} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-brand" />
            {promise}
          </li>
        ))}
      </ul>

      <GoogleSignInButton />

      <p className="text-center text-xs text-muted">
        En continuant, tu pourras lire et accepter nos{' '}
        <Link to="/conditions" className="underline">
          conditions d'utilisation
        </Link>{' '}
        et notre{' '}
        <Link to="/confidentialite" className="underline">
          politique de confidentialité
        </Link>
        .
      </p>
    </main>
  )
}
