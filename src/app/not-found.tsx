import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-5 pt-28 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">This page doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-fg"
      >
        Back home
      </Link>
    </div>
  )
}
