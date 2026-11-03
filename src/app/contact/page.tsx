import { FileText } from 'lucide-react'
import type { Metadata } from 'next'

import { BrandIcon } from '@/components/brand-icon'
import { ContactChat } from '@/components/contact-chat'
import { CopyEmail } from '@/components/copy-email'
import { PageHeader } from '@/components/page-header'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a role, a project or a question? Get in touch.',
  alternates: { canonical: '/contact' },
}

const linkClass =
  'inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent/60 hover:text-accent'

export default function ContactPage() {
  const socials = site.socials.filter((social) => social.href)

  return (
    <div className="mx-auto max-w-5xl px-5 pt-32 pb-20">
      <PageHeader
        title="Contact"
        subtitle="Have a role, a project or a question? Start a quick chat. It takes under a minute."
      />
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <ContactChat />

        <aside className="flex flex-col gap-6 rounded-2xl border border-line bg-surface/50 p-6">
          <div>
            <h2 className="font-mono text-sm text-accent">Prefer email?</h2>
            <div className="mt-3">
              <CopyEmail email={site.email} />
            </div>
          </div>

          {(socials.length > 0 || site.resumeUrl) && (
            <div>
              <h2 className="font-mono text-sm text-accent">Elsewhere</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <li key={social.platform}>
                    <a href={social.href} rel="me noopener" className={linkClass}>
                      <BrandIcon slug={social.platform} className="size-4" />
                      {social.platform === 'github' ? 'GitHub' : 'LinkedIn'}
                    </a>
                  </li>
                ))}
                {site.resumeUrl && (
                  <li>
                    <a href={site.resumeUrl} className={linkClass}>
                      <FileText aria-hidden className="size-4" />
                      Résumé
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="mt-auto rounded-xl border border-line bg-bg/60 p-4">
            <p className="inline-flex items-center gap-2 text-sm">
              <span aria-hidden className="size-2 rounded-full bg-online" />
              Available
            </p>
            <p className="mt-1.5 text-sm text-muted">{site.availability}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
