import { Contact } from '@/components/contact'
import { CursorGlow } from '@/components/cursor-glow'
import { Hero } from '@/components/hero'
import { Nav } from '@/components/nav'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { site } from '@/content/site'

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <CursorGlow />
      <Nav />
      <main id="main">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="px-5 pt-6 pb-10 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {site.name} · Built with Next.js
      </footer>
    </>
  )
}
