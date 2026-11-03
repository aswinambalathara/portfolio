import type { Metadata } from 'next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Section, SectionLabel } from '@/components/ui/section'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { ContextBadge, PulseDot, StatusBadge } from '@/components/ui/status-badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'

// Hidden design-system reference (PRD §9). Sample copy here is not site content.
export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
}

const swatches = [
  ['background', 'bg-background'],
  ['foreground', 'bg-foreground'],
  ['card', 'bg-card'],
  ['muted', 'bg-muted'],
  ['muted-foreground', 'bg-muted-foreground'],
  ['primary', 'bg-primary'],
  ['border', 'bg-border'],
  ['ring', 'bg-ring'],
] as const

const buttonVariants = ['default', 'secondary', 'outline', 'ghost', 'link'] as const

const statuses = ['live', 'in-progress', 'paused', 'archived'] as const

export default function StyleguidePage() {
  return (
    <>
      <header className="container-page flex items-center justify-between py-6">
        <span className="font-mono text-sm text-muted-foreground">styleguide</span>
        <ThemeToggle />
      </header>

      <Section label="typography" className="bg-dot-grid">
        <h1>Hi, I build things.</h1>
        <h2 className="mt-6">Section heading</h2>
        <h3 className="mt-4">Card heading</h3>
        <p className="mt-4 max-w-[70ch] text-muted-foreground">
          Body text is Geist Sans at 16 to 17px with a 1.6 line height, kept under 70 characters
          wide. Headings scale fluidly with clamp().
        </p>
        <p className="mt-2 font-mono text-sm">Geist Mono for labels, tags and code.</p>
      </Section>

      <Section label="colours">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {swatches.map(([name, className]) => (
            <div key={name}>
              <div className={`h-16 rounded-lg border ${className}`} />
              <p className="mt-2 font-mono text-xs text-muted-foreground">{name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="buttons">
        <div className="flex flex-wrap items-center gap-3">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
          <Button size="lg">Large button</Button>
          <Button size="sm" variant="outline">
            Small button
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section label="badges">
        <div className="flex flex-wrap items-center gap-3">
          {statuses.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
          <ContextBadge context="professional" />
          <ContextBadge context="personal" />
          <Badge variant="outline" className="font-mono">
            Next.js
          </Badge>
          <span className="inline-flex items-center gap-2 text-sm">
            <PulseDot /> Availability dot
          </span>
        </div>
      </Section>

      <Section label="cards">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>12px radius, 1px low-contrast border.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <ContextBadge context="personal" />
              <StatusBadge status="live" />
            </CardContent>
          </Card>
          <SpotlightCard>
            <CardHeader>
              <CardTitle>Spotlight card</CardTitle>
              <CardDescription>
                Move a mouse over it: a soft glow follows the cursor and a shadow appears.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <ContextBadge context="professional" />
              <StatusBadge status="in-progress" />
            </CardContent>
          </SpotlightCard>
        </div>
      </Section>

      <Section>
        <SectionLabel>section label</SectionLabel>
        <p className="text-muted-foreground">
          Sections use 64px padding on mobile, 96px on desktop.
        </p>
      </Section>
    </>
  )
}
