// The heading block at the top of each inner page: title, a short accent rule and a subtitle.
export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-14 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <div
        aria-hidden
        className="mx-auto mt-5 h-1 w-24 rounded-full bg-linear-to-r from-accent to-cyan"
      />
      <p className="mx-auto mt-5 max-w-xl text-muted">{subtitle}</p>
    </header>
  )
}
