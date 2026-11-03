import { ArrowDown, FileText, Mail } from 'lucide-react'

import { BrandIcon } from '@/components/brand-icon'
import { site } from '@/content/site'

const initials = site.name
  .split(' ')
  .slice(0, 2)
  .map((part) => part[0])
  .join('')

export function Hero() {
  const socials = site.socials.filter((social) => social.href)

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="flex min-h-svh scroll-mt-24 flex-col items-center justify-center px-5 pt-24 pb-16 text-center"
    >
      <div className="relative animate-rise">
        <div className="absolute -inset-6 rounded-full bg-accent-strong/25 blur-3xl" aria-hidden />
        <div className="relative rounded-full bg-gradient-to-br from-accent via-accent-strong to-cyan p-[3px]">
          {site.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimisation
            <img
              src={site.avatarUrl}
              alt={site.name}
              width={144}
              height={144}
              className="size-32 rounded-full object-cover sm:size-36"
            />
          ) : (
            <div className="grid size-32 place-items-center rounded-full bg-surface font-mono text-4xl font-semibold text-fg sm:size-36">
              {initials}
            </div>
          )}
        </div>
      </div>

      <p className="mt-8 inline-flex animate-rise items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted [animation-delay:80ms]">
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-online/70" />
          <span className="relative inline-flex size-2 rounded-full bg-online" />
        </span>
        {site.availability}
      </p>

      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
        Hi, I&apos;m{' '}
        <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
          {site.firstName}
        </span>
      </h1>
      <p className="mt-3 font-mono text-sm text-accent sm:text-base">{site.role}</p>
      <p className="mt-6 max-w-xl text-lg text-balance text-fg/90 sm:text-xl">{site.tagline}</p>
      <p className="mt-3 max-w-xl text-pretty text-muted">{site.intro}</p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        {site.resumeUrl && (
          <a
            href={site.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-fg"
          >
            <FileText className="size-4" aria-hidden />
            View résumé
          </a>
        )}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent"
        >
          <Mail className="size-4" aria-hidden />
          Contact me
        </a>
      </div>

      {socials.length > 0 && (
        <ul className="mt-6 flex items-center gap-2">
          {socials.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                rel="me noopener"
                aria-label={social.platform === 'github' ? 'GitHub' : 'LinkedIn'}
                className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                <BrandIcon slug={social.platform} className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      )}

      <a
        href="#skills"
        aria-label="Scroll to skills"
        className="mt-14 hidden rounded-full p-2 text-muted transition-colors hover:text-fg sm:block"
      >
        <ArrowDown className="size-5" aria-hidden />
      </a>
    </section>
  )
}
