'use client'

import Script from 'next/script'
import { useRef, useState, type FormEvent } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { contactSchema, type ContactFieldErrors } from '@/lib/contact-schema'
import { cn } from '@/lib/utils'

type TurnstileApi = {
  render: (element: HTMLElement, options: { sitekey: string }) => string
  reset: (widgetId?: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const reasons = [
  { value: 'job', label: 'A job opportunity' },
  { value: 'freelance', label: 'Freelance work' },
  { value: 'other', label: 'Something else' },
] as const

const fieldClass =
  'w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive'

// FR-60 to FR-62: inline validation, honeypot, optional Turnstile, success state.
export function ContactForm({
  turnstileSiteKey,
  nonce,
}: {
  turnstileSiteKey?: string
  nonce?: string
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<ContactFieldErrors>({})
  const [formError, setFormError] = useState('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)

  function renderTurnstile() {
    if (turnstileSiteKey && window.turnstile && turnstileRef.current && !widgetId.current) {
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
      })
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const values = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      reason: String(form.get('reason') ?? ''),
      message: String(form.get('message') ?? ''),
    }

    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      setFormError('')
      return
    }

    setErrors({})
    setFormError('')
    setStatus('submitting')
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...parsed.data,
        website: form.get('website'),
        turnstileToken: form.get('cf-turnstile-response'),
      }),
    }).catch(() => null)

    if (response?.ok) {
      setStatus('success')
      return
    }
    const result = (await response?.json().catch(() => null)) as {
      errors?: ContactFieldErrors
      error?: string
    } | null
    setErrors(result?.errors ?? {})
    setFormError(result?.error ?? 'Something went wrong. Please try again, or email me directly.')
    setStatus('error')
    window.turnstile?.reset(widgetId.current)
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border bg-card p-6">
        <p className="text-lg font-medium">Thanks, your message is on its way.</p>
        <p className="mt-2 text-muted-foreground">I&apos;ll get back to you soon.</p>
      </div>
    )
  }

  const errorFor = (field: keyof ContactFieldErrors) =>
    errors[field]?.[0] ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[field]?.[0]}
      </p>
    ) : null
  const invalid = (field: keyof ContactFieldErrors) => ({
    'aria-invalid': Boolean(errors[field]?.length),
    'aria-describedby': errors[field]?.length ? `${field}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            {...invalid('name')}
          />
          {errorFor('name')}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            {...invalid('email')}
          />
          {errorFor('email')}
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="mb-1.5 block text-sm font-medium">
          Reason
        </label>
        <select
          id="reason"
          name="reason"
          defaultValue="job"
          className={fieldClass}
          {...invalid('reason')}
        >
          {reasons.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
        {errorFor('reason')}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={2000}
          className={cn(fieldClass, 'resize-y')}
          {...invalid('message')}
        />
        {errorFor('message')}
      </div>

      {/* Honeypot: hidden from people, filled in by bots (FR-61). */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            nonce={nonce}
            onReady={renderTurnstile}
          />
          <div ref={turnstileRef} />
        </>
      )}

      {formError && (
        <p role="alert" className="text-sm text-destructive">
          {formError}
        </p>
      )}

      <div>
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}
