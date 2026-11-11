type LogoProps = {
  /** Le pictogramme seul, sans le mot « kolok ». */
  iconOnly?: boolean
  className?: string
}

/**
 * Logo provisoire, d'après la description de la charte (aucun fichier de logo n'existe encore) :
 * deux cercles qui se chevauchent, l'un ink, l'autre terre, puis « kolok » en minuscules, graisse 800.
 */
export function Logo({ iconOnly = false, className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-ink ${className}`}>
      <svg viewBox="0 0 38 24" aria-hidden="true" className="h-6 w-auto">
        <circle cx="12" cy="12" r="12" fill="var(--ink)" />
        <circle cx="26" cy="12" r="12" fill="var(--terre)" />
      </svg>
      {iconOnly ? (
        <span className="sr-only">Kolok</span>
      ) : (
        <span style={{ font: 'var(--text-title-2)', fontWeight: 800 }}>kolok</span>
      )}
    </span>
  )
}
