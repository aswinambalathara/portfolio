import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { site } from '@/content/site'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} · ${site.role}`,
  description: site.tagline,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-svh">{children}</body>
    </html>
  )
}
