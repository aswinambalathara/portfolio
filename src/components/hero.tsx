import { FileText, FolderGit2, Mail } from 'lucide-react'
import Link from 'next/link'

import { BrandIcon } from '@/components/brand-icon'
import { site } from '@/content/site'

const initials = site.name
  .split(' ')
  .slice(0, 2)
  .map((part) => part[0])
  .join('')

const secondary =
  'inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent'

export function Hero() {
  const socials = site.socials.filter((social) => social.href)

  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center px-5 pt-28 pb-16 text-center"
    >
      <div className="relative animate-rise">
        <div className="absolute -inset-6 rounded-full bg-accent-strong/25 blur-3xl" aria-hidden />
        <div className="relative rounded-full bg-linear-to-br from-amber-200 via-amber-400 to-orange-500 p-[3px]">
          {site.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimisation
            <img
              src={site.avatarUrl}
              alt={site.name}
              width={208}
              height={208}
              className="size-40 rounded-full object-cover sm:size-52"
            />
          ) : (
            <div className="grid size-40 place-items-center rounded-full bg-surface font-mono text-4xl font-semibold text-fg sm:size-52">
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
        <span className="bg-linear-to-r from-accent to-cyan bg-clip-text text-transparent">
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
        <Link href="/projects" className={secondary}>
          <FolderGit2 className="size-4" aria-hidden />
          See my work
        </Link>
        <Link href="/contact" className={secondary}>
          <Mail className="size-4" aria-hidden />
          Contact me
        </Link>
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
    </section>
  )
}
