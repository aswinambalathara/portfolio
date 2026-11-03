import { AvailabilityBadge } from '@/components/availability-badge'
import { CtaLink } from '@/components/cta-link'
import { Button } from '@/components/ui/button'
import type { Hero, SiteSetting } from '@/payload-types'

// FR-10, FR-11. The statement is the page's one large element. The résumé CTA is hidden when no
// résumé is uploaded (FR-71).
export function HeroSection({
  hero,
  settings,
  hasResume,
}: {
  hero: Hero
  settings: SiteSetting
  hasResume: boolean
}) {
  const ctas = [hero.primaryCta, hero.secondaryCta].filter(
    (cta): cta is { label: string; href: string } =>
      Boolean(cta?.label && cta.href) && (cta?.href !== '/resume' || hasResume),
  )
  const greeting = hero.heading || settings.name

  return (
    <section className="container-page pt-16 pb-14 md:pt-28 md:pb-20">
      <h1 className="max-w-[20ch]">
        {greeting && (
          <span className="mb-3 block text-lg font-normal tracking-normal text-muted-foreground md:text-xl">
            {greeting}
          </span>
        )}
        {hero.subheading}
      </h1>
      {hero.intro && <p className="mt-6 max-w-[62ch] text-muted-foreground">{hero.intro}</p>}
      <div className="mt-6">
        <AvailabilityBadge availability={settings.availability} />
      </div>
      {ctas.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {ctas.map((cta, index) =>
            index === 0 ? (
              <Button key={cta.href} asChild size="lg">
                <CtaLink href={cta.href}>{cta.label}</CtaLink>
              </Button>
            ) : (
              <Button key={cta.href} asChild size="lg" variant="ghost">
                <CtaLink href={cta.href}>{cta.label}</CtaLink>
              </Button>
            ),
          )}
        </div>
      )}
    </section>
  )
}
