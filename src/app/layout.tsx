import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Nav } from '@/components/nav'
import { Particles } from '@/components/particles'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteFooter } from '@/components/site-footer'
import { coreStacks, site } from '@/content/site'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const homeTitle = `${site.name} (${site.alternateName}) · ${site.role}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: homeTitle, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website',
    title: homeTitle,
    description: site.description,
    siteName: site.name,
  },
  twitter: { card: 'summary_large_image' },
}

// Schema.org Person, so search engines link both names, the profiles and this site to one person.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.alternateName,
  url: site.url,
  image: new URL(site.avatarUrl, site.url).href,
  jobTitle: site.jobTitle,
  description: site.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.country,
  },
  knowsAbout: [...new Set(coreStacks.flatMap((stack) => stack.skills))],
  sameAs: site.socials.map((social) => social.href).filter(Boolean),
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
        <script
          type="application/ld+json"
          // Escaping `<` keeps the JSON from closing the script tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 bg-dots" />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 bg-glow" />
        <Particles />
        <ScrollReveal />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
