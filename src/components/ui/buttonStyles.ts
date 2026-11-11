/**
 * primary   : fond terre. Un seul par écran, pour l'action principale.
 * secondary : contour ink, fond transparent. Toutes les autres actions.
 * ghost     : texte seul, pour les actions discrètes (se déconnecter).
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const BASE =
  'type-body-strong inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 transition-opacity active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-terre text-on-terre',
  secondary: 'border border-ink bg-transparent text-ink',
  ghost: 'text-terre-ink',
}

/** Les classes d'un bouton, pour habiller aussi bien un <button> qu'un lien. */
export function buttonClasses(variant: ButtonVariant = 'primary', fullWidth = false): string {
  return `${BASE} ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''}`
}
