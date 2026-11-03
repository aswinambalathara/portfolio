import type { Metadata } from 'next'

import { AvailabilityBadge } from '@/components/availability-badge'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { ContextBadge, StatusBadge } from '@/components/ui/status-badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'

// Hidden design-system reference (PRD §9). Sample copy here is not site content.
export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
}

const swatches = [
  ['Paper', 'bg-background'],
  ['Ink', 'bg-foreground'],
  ['Muted text', 'bg-muted-foreground'],
  ['Rule', 'bg-border'],
  ['Backwater', 'bg-primary'],
  ['Wash', 'bg-secondary'],
] as const

const buttonVariants = ['default', 'outline', 'ghost', 'link'] as const

const statuses = ['live', 'in-progress', 'paused', 'archived'] as const

export default function StyleguidePage() {
  return (
    <>
      <div className="container-page flex items-center justify-between pt-12 pb-8">
        <h1>Styleguide</h1>
        <ThemeToggle />
      </div>

      <Section id="type" title="Type">
        <p className="text-sm text-muted-foreground">Schibsted Grotesk, one family throughout.</p>
        <p className="mt-6 max-w-[20ch] text-[clamp(2rem,1.35rem+2.8vw,3.25rem)] leading-[1.12] font-medium tracking-[-0.025em]">
          The hero statement is the one large element.
        </p>
        <h3 className="mt-8">Item title, 18px semibold</h3>
        <p className="mt-2 max-w-[62ch]">
          Body text is 16 to 17px with a 1.65 line height, kept under about 65 characters per line.
          Section titles sit quietly in the left margin, like headings on a well-set CV.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Secondary text, 14px, muted.</p>
      </Section>

      <Section id="colour" title="Colour">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {swatches.map(([name, className]) => (
            <li key={name}>
              <div className={`h-14 rounded-md border ${className}`} />
              <p className="mt-2 text-sm text-muted-foreground">{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section id="tags" title="Tags">
        <div className="flex flex-wrap items-center gap-3">
          <ContextBadge context="professional" />
          <ContextBadge context="personal" />
          {statuses.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
        <div className="mt-6">
          <AvailabilityBadge
            availability={{ isOpen: true, text: 'Open to roles: remote or on-site' }}
          />
        </div>
      </Section>

      <Section id="links" title="Links">
        <p className="max-w-[62ch]">
          Inline links use the accent:{' '}
          <a href="#links" className="text-primary hover:underline">
            a sample link
          </a>
          . The accent is reserved for links, the primary button, focus rings and the availability
          dot.
        </p>
      </Section>
    </>
  )
}
