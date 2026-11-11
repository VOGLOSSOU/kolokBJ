import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { StatusScreen } from '@/components/StatusScreen'
import { Button } from '@/components/ui/Button'
import { useCompleteOnboarding } from '@/features/auth/session'
import { normalizeBeninPhone } from '@/lib/format'

const COMMUNITY_RULES = [
  'Interdit aux agents immobiliers, démarcheurs et propriétaires qui cherchent des locataires.',
  'Aucune demande d’argent : pas de frais de visite, pas d’avance avant rencontre.',
  'Un profil = une vraie personne, étudiante, avec ses vraies photos.',
  'Violation = bannissement définitif.',
]

/** Juste après la première connexion : numéro WhatsApp obligatoire et acceptation des règles. */
export default function OnboardingPage() {
  const { mutate: complete, isPending, error } = useCompleteOnboarding()
  const [phone, setPhone] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  function submit(event: FormEvent) {
    event.preventDefault()

    const whatsapp = normalizeBeninPhone(phone)
    if (!whatsapp) {
      setPhoneError('Entre un numéro béninois valide, par exemple 01 97 00 00 00.')
      return
    }
    setPhoneError(null)
    complete({ whatsapp, acceptedTerms: true })
  }

  return (
    <StatusScreen title="Bienvenue ! Une dernière étape">
      <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="whatsapp" className="type-body-strong text-ink">
            Ton numéro WhatsApp
          </label>
          <div className="flex items-center gap-2 rounded-sm border border-line bg-surface-raised px-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus-ring">
            <span className="text-ink-muted">+229</span>
            <input
              id="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="01 97 00 00 00"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              aria-invalid={phoneError !== null}
              aria-describedby="whatsapp-help"
              className="h-12 min-w-0 flex-1 bg-transparent text-ink outline-none"
            />
          </div>
          <p id="whatsapp-help" className={`type-small ${phoneError ? 'text-danger' : ''}`}>
            {phoneError ??
              'Il reste caché. Il n’est révélé qu’à un étudiant dont tu acceptes la demande, ou qui accepte la tienne.'}
          </p>
        </div>

        <div className="rounded-md border border-line bg-surface-raised p-4">
          <p className="type-body-strong text-ink">Les règles de la communauté</p>
          <ul className="type-small mt-2 list-disc space-y-1 pl-6">
            {COMMUNITY_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>

        <label className="type-small flex items-start gap-3">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="size-5 shrink-0 accent-terre"
          />
          <span>
            J'accepte les règles de la communauté, les{' '}
            <Link to="/conditions" className="underline">
              conditions d'utilisation
            </Link>{' '}
            et la{' '}
            <Link to="/confidentialite" className="underline">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>

        {error && (
          <p role="alert" className="type-small text-danger">
            {error.message}
          </p>
        )}

        <Button type="submit" fullWidth disabled={!accepted || isPending}>
          {isPending ? 'Enregistrement…' : 'Continuer'}
        </Button>
      </form>
    </StatusScreen>
  )
}
