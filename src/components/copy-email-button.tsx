'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

// FR-63: email with copy to clipboard.
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className="inline-flex items-center gap-1">
      <a href={`mailto:${email}`} className="text-primary hover:underline">
        {email}
      </a>
      <Button variant="ghost" size="icon-sm" onClick={copy} aria-label="Copy email address">
        {copied ? <Check /> : <Copy />}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied' : ''}
      </span>
    </span>
  )
}
