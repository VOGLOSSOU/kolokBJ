type PagePlaceholderProps = {
  title: string
  /** Ce que l'écran devra contenir, d'après le cahier des charges. */
  todo: string[]
}

/** Écran pas encore construit : le routage existe, le contenu reste à faire. */
export function PagePlaceholder({ title, todo }: PagePlaceholderProps) {
  return (
    <section className="flex flex-col gap-4 px-4 py-6">
      <h1 className="type-title-1">{title}</h1>
      <div className="rounded-md border border-dashed border-line bg-surface-raised p-4">
        <p className="type-caption text-ink-muted">À construire</p>
        <ul className="type-small mt-2 list-disc space-y-1 pl-6 text-ink-muted">
          {todo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
