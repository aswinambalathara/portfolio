import { FileText } from 'lucide-react'

import { BrandIcon } from '@/components/brand-icon'
import { CopyEmail } from '@/components/copy-email'
import { site } from '@/content/site'

export function Contact() {
  const socials = site.socials.filter((social) => social.href)

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 px-5 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-line bg-surface/70 px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-accent-strong/20 blur-3xl"
        />
        <h2
          id="contact-heading"
          className="relative text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Let&apos;s work together
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-muted">
          I&apos;m open to full-time roles and freelance work. The fastest way to reach me is email.
        </p>

        <div className="relative mt-8 flex justify-center">
          <CopyEmail email={site.email} />
        </div>

        {(socials.length > 0 || site.resumeUrl) && (
          <ul className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  rel="me noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <BrandIcon slug={social.platform} className="size-4" />
                  {social.platform === 'github' ? 'GitHub' : 'LinkedIn'}
                </a>
              </li>
            ))}
            {site.resumeUrl && (
              <li>
                <a
                  href={site.resumeUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <FileText className="size-4" aria-hidden />
                  Résumé
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  )
}
