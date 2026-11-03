'use client'

import { Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-surface/60 py-1 pr-1 pl-4">
      <Mail aria-hidden className="size-4 text-accent" />
      <a href={`mailto:${email}`} className="px-2 text-sm hover:text-accent">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="rounded-full p-2 text-muted transition-colors hover:bg-white/5 hover:text-fg"
      >
        {copied ? <Check className="size-4 text-online" /> : <Copy className="size-4" />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied' : ''}
      </span>
    </div>
  )
}
