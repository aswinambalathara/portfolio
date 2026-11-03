import Link from 'next/link'

import { Button } from '@/components/ui/button'

// FR-07
export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-start gap-5 pt-24 pb-32 md:pt-32">
      <h1>Page not found</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist or has moved.</p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/projects">Projects</Link>
        </Button>
      </div>
    </div>
  )
}
