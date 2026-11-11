import { Link } from 'react-router'
import { Logo } from '@/components/Logo'
import { GoogleSignInButton } from '@/features/auth/GoogleSignInButton'

const PROMISES = [
  'Réservé aux étudiants : pas d’agents, pas de démarcheurs.',
  'Chaque profil est relu à la main avant d’être visible.',
  'Tu vois d’abord les étudiants compatibles avec ton budget, ton quartier et ton rythme de vie.',
]

/** Écran d'accueil : la promesse, trois raisons d'y croire, une seule action. */
export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-8 px-4 py-8">
      <div className="flex flex-col gap-6">
        <Logo />
        <h1 className="type-display">
          Trouve un coloc de confiance, qui vit comme toi.
        </h1>
      </div>

      <ul className="flex flex-col gap-3 text-ink-muted">
        {PROMISES.map((promise) => (
          <li key={promise} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-pill bg-terre" />
            {promise}
          </li>
        ))}
      </ul>

      <GoogleSignInButton />

      <p className="type-small text-center text-ink-muted">
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
