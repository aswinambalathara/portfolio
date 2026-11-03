import type { Metadata } from 'next'
import { Schibsted_Grotesk } from 'next/font/google'
import { draftMode, headers } from 'next/headers'
import React from 'react'

import { LivePreviewListener } from '@/components/layout/live-preview-listener'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import { getSeoDefaults, getSiteSettings } from '@/lib/cms/globals'
import { siteUrl } from '@/lib/site'
import './globals.css'

// One family throughout (PRD §9): a grotesque drawn for a newspaper, for an editorial voice.
const sans = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-sans-face' })

// Every public page renders per request: the CSP nonce needs it, CMS reads are tag-cached
// (PRD §7.6), and `next build` must never touch the database.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const [settings, defaults] = await Promise.all([getSiteSettings(), getSeoDefaults()])
  const fallbackTitle = [settings.name, settings.title].filter(Boolean).join(' · ')
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaults.metaTitle || fallbackTitle,
      template: settings.name ? `%s · ${settings.name}` : '%s',
    },
    description: defaults.metaDescription || settings.tagline || undefined,
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  // NFR-30: the per-request CSP nonce set in src/proxy.ts.
  const nonce = (await headers()).get('x-nonce') ?? undefined
  const { isEnabled: isPreview } = await draftMode()

  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem nonce={nonce}>
          <a
            href="#main"
            className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          {isPreview && (
            <div className="bg-primary px-4 py-2 text-center text-sm text-primary-foreground">
              Preview mode: showing unpublished changes.{' '}
              {/* A full request is needed: the route handler clears the draft-mode cookie. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/preview?exit=1" className="underline">
                Exit preview
              </a>
              <LivePreviewListener />
            </div>
          )}
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
