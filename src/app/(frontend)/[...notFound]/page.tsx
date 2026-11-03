import { notFound } from 'next/navigation'

// FR-07: the site and the admin have separate root layouts, so unmatched URLs would otherwise get
// Next's default 404. This catch-all sends them to (frontend)/not-found.tsx instead.
export default function CatchAll() {
  notFound()
}
