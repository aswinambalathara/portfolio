import { headers } from 'next/headers'

import { ContactForm } from '@/components/contact/contact-form'
import { CopyEmailButton } from '@/components/copy-email-button'
import { getSiteSettings } from '@/lib/cms/globals'
import { buildMetadata } from '@/lib/seo'
import { isTurnstileEnabled } from '@/lib/turnstile'

export function generateMetadata() {
  return buildMetadata({ title: 'Contact', path: '/contact' })
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const nonce = (await headers()).get('x-nonce') ?? undefined
  const links = (settings.socials ?? []).filter((social) =>
    /linkedin|github/i.test(social.platform),
  )

  return (
    <div className="container-page grid gap-12 pt-16 pb-20 md:grid-cols-[1fr_1.4fr] md:pt-24">
      <div>
        <h1>Contact</h1>
        {settings.availability?.isOpen && settings.availability.text && (
          <p className="mt-4 text-muted-foreground">{settings.availability.text}</p>
        )}
        <div className="mt-8 space-y-4">
          {settings.email && <CopyEmailButton email={settings.email} />}
          {links.length > 0 && (
            <ul className="flex flex-wrap gap-4 text-sm">
              {links.map((social) => (
                <li key={social.id ?? social.url}>
                  <a
                    href={social.url}
                    rel="me noopener"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ContactForm
        turnstileSiteKey={
          isTurnstileEnabled() ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : undefined
        }
        nonce={nonce}
      />
    </div>
  )
}
