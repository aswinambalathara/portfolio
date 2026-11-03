export function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-10 text-center">
      <h2 id={id} className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-muted">{subtitle}</p>
    </div>
  )
}
