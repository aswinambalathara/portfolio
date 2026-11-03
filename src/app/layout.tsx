import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Nav } from '@/components/nav'
import { Particles } from '@/components/particles'
import { SiteFooter } from '@/components/site-footer'
import { site } from '@/content/site'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.tagline,
  openGraph: {
    type: 'website',
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
    siteName: site.name,
  },
}

export const viewport: Viewport = {
  themeColor: '#090a10',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior lets Next.js turn smooth scrolling off during page changes, so a new
    // page starts at the top instead of animating there.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 bg-dots" />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 bg-glow" />
        <Particles />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
