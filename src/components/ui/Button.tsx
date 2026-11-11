import type { ButtonHTMLAttributes } from 'react'

/**
 * primary   : fond terre. Un seul par écran, pour l'action principale.
 * secondary : contour ink, fond transparent. Toutes les autres actions.
 * ghost     : texte seul, pour les actions discrètes (se déconnecter).
 */
type Variant = 'primary' | 'secondary' | 'ghost'

const BASE =
  'type-body-strong inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 transition-opacity active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-terre text-on-terre',
  secondary: 'border border-ink bg-transparent text-ink',
  ghost: 'text-terre-ink',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    />
  )
}
