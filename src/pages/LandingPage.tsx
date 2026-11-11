import { BadgeCheck } from 'lucide-react'
import { Link, Navigate } from 'react-router'
import { Logo } from '@/components/Logo'
import { buttonClasses } from '@/components/ui/buttonStyles'
import { GoogleSignInButton } from '@/features/auth/GoogleSignInButton'
import { useSession } from '@/features/auth/session'
import { STAGE_HOME, stageOf } from '@/features/auth/stage'
import { formatFcfa } from '@/lib/format'

const STEPS = [
  {
    title: 'Crée ton profil',
    text: 'Tes études, ton budget, tes quartiers et ton rythme de vie : réveil, révisions, invités, propreté.',
  },
  {
    title: 'On relit ton profil',
    text: 'Chaque profil est relu avant d’être visible. Tu as une réponse en moins de 24 h.',
  },
  {
    title: 'Tu vois qui te correspond',
    text: 'Seulement des étudiants compatibles avec ton budget et ton quartier, classés par score de compatibilité.',
  },
  {
    title: 'Vous vous rencontrez',
    text: 'Tu proposes une coloc. Si l’autre accepte, vous recevez vos numéros WhatsApp et vous organisez la visite.',
  },
]

const SITUATIONS = [
  {
    title: 'Tu as déjà un logement',
    text: 'Présente-toi, montre ta chambre et ses détails. Les étudiants qui cochent tes critères te trouvent.',
  },
  {
    title: 'Tu n’as pas encore loué',
    text: 'Dis ce que tu cherches, et trouve quelqu’un avec qui te lancer pour louer ensemble.',
  },
]

const RULES = [
  'Réservé aux étudiants. Pas d’agents, pas de démarcheurs.',
  'Aucune demande d’argent : pas de frais de visite, pas d’avance avant rencontre.',
  'Ton numéro WhatsApp reste caché tant que vous n’avez pas accepté tous les deux.',
  'Un bouton Signaler sur chaque profil. Une violation des règles, c’est le bannissement.',
]

/** Largeur et marges communes à l'en-tête, aux sections et au pied de page. */
const CONTAINER = 'mx-auto w-full max-w-6xl px-4 md:px-8'

/**
 * Aperçu d'un profil tel qu'il apparaîtra dans l'appli, avec des données d'exemple.
 * Purement illustratif : visible à partir de la tablette, à côté de l'accroche.
 */
function ProfilePreview() {
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 rounded-md border border-line bg-surface-raised p-6">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="type-title-2 grid size-16 shrink-0 place-items-center rounded-pill bg-terre-soft text-terre-ink"
          >
            A
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="type-title-2">Arsène</p>
            <p className="type-small text-ink-muted">Licence 2, Géographie - UAC</p>
          </div>
        </div>

        <p className="type-caption inline-flex items-center gap-1 self-start rounded-pill bg-vert-soft px-3 py-1 text-vert">
          <BadgeCheck size={16} strokeWidth={1.75} aria-hidden="true" />
          Profil validé
        </p>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
          <div className="flex flex-col gap-3">
            <p>
              <span className="type-small block text-ink-muted">A une chambre-salon, sa part</span>
              <span className="type-body-strong">{formatFcfa(15000)} par mois</span>
            </p>
            <ul className="flex flex-wrap gap-2">
              {['Zogbadjè', 'Tankpè'].map((quartier) => (
                <li
                  key={quartier}
                  className="type-caption rounded-pill bg-terre-soft px-3 py-1 text-terre-ink"
                >
                  {quartier}
                </li>
              ))}
            </ul>
          </div>
          <p className="flex shrink-0 flex-col items-center gap-1">
            <span className="type-display grid size-24 place-items-center rounded-pill border-2 border-vert text-vert">
              86
            </span>
            <span className="type-caption text-ink-muted">compatibilité</span>
          </p>
        </div>

        <ul className="type-small flex flex-col gap-1 text-ink-muted">
          <li>Se lève à 6 h, révise le soir</li>
          <li>Non fumeur, peu d'invités</li>
        </ul>
      </div>
      <figcaption className="type-small text-center text-ink-muted">
        Exemple de profil, tel que tu le verras dans l'appli.
      </figcaption>
    </figure>
  )
}

/**
 * Page d'accueil publique. Elle s'affiche tout de suite, pour tout le monde,
 * sans attendre la session ni le backend. Un utilisateur déjà connecté est
 * simplement renvoyé vers son écran dès que sa session est connue.
 */
export default function LandingPage() {
  const { data: user } = useSession()

  if (user) return <Navigate to={STAGE_HOME[stageOf(user)]} replace />

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-surface">
        <div className={`${CONTAINER} flex h-16 items-center justify-between gap-4`}>
          <Logo />
          {/* Le seul bouton terre de la page : il ramène à la zone d'inscription, d'où qu'on soit. */}
          <a href="#commencer" className={buttonClasses('primary')}>
            Commencer
          </a>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-8 py-8 lg:gap-0 lg:py-0">
        <section className={`${CONTAINER} grid items-center gap-8 md:grid-cols-2 lg:py-8`}>
          <div className="flex flex-col gap-6 lg:py-8">
            <h1 className="type-display">Trouve un coloc de confiance, qui vit comme toi.</h1>
            <p className="text-ink-muted">
              Kolok aide les étudiants du Bénin à partager un loyer avec quelqu'un de fiable et de
              compatible. On démarre autour du campus d'Abomey-Calavi : Zogbadjè, Tankpè,
              Bidossessi, ITA.
            </p>
            <div id="commencer" className="flex scroll-mt-24 flex-col gap-3 sm:max-w-sm">
              <GoogleSignInButton />
              <p className="type-small text-center text-ink-muted">C'est gratuit.</p>
            </div>
          </div>
          <div className="hidden md:block">
            <ProfilePreview />
          </div>
        </section>

        <section className="border-line lg:border-y lg:bg-surface-raised lg:py-8">
          <div className={`${CONTAINER} grid gap-3 md:grid-cols-2 md:gap-8`}>
            <h2 className="type-title-1">Seul, le loyer est trop lourd.</h2>
            <p className="text-ink-muted">
              Avec {formatFcfa(15000)} de budget, tu tombes sur des entrées-couchées à 27{'\u202f'}000 ou{' '}
              {formatFcfa(30000)}. À deux, ça passe. Encore faut-il trouver la bonne personne, et
              les groupes Facebook sont noyés sous les annonces d'agents.
            </p>
          </div>
        </section>

        <section className={`${CONTAINER} flex flex-col gap-6 lg:py-8`}>
          <h2 className="type-title-1">Comment ça marche</h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-3 lg:flex-col">
                <span
                  aria-hidden="true"
                  className="type-body-strong grid size-8 shrink-0 place-items-center rounded-pill bg-terre-soft text-terre-ink"
                >
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="type-body-strong">{step.title}</h3>
                  <p className="text-ink-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${CONTAINER} grid gap-8 lg:grid-cols-2 lg:py-8`}>
          <div className="flex flex-col gap-4">
            <h2 className="type-title-1">Deux façons de commencer</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {SITUATIONS.map((situation) => (
                <li
                  key={situation.title}
                  className="flex flex-col gap-1 rounded-md border border-line bg-surface-raised p-4"
                >
                  <h3 className="type-body-strong">{situation.title}</h3>
                  <p className="text-ink-muted">{situation.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="type-title-1">Entre étudiants, en confiance</h2>
            <ul className="grid gap-3 text-ink-muted sm:grid-cols-2 lg:grid-cols-1">
              {RULES.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-pill bg-terre" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div
          className={`${CONTAINER} type-small flex flex-col gap-3 py-6 text-ink-muted md:flex-row md:items-center md:justify-between`}
        >
          <p>Kolok n'est pas un site d'annonces de logements, ni une appli de rencontre.</p>
          <p className="flex shrink-0 flex-wrap gap-4">
            <Link to="/conditions" className="underline">
              Conditions d'utilisation
            </Link>
            <Link to="/confidentialite" className="underline">
              Confidentialité
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
