type PagePlaceholderProps = {
  title: string
  /** Ce que l'écran devra contenir, d'après le cahier des charges. */
  todo: string[]
}

/** Écran pas encore construit : le routage existe, le contenu attend le design. */
export function PagePlaceholder({ title, todo }: PagePlaceholderProps) {
  return (
    <section className="flex flex-col gap-4 px-5 py-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="rounded-2xl border border-dashed border-line bg-surface p-4">
        <p className="text-sm font-semibold text-muted">À construire</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          {todo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
