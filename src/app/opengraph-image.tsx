import { ImageResponse } from 'next/og'

import { site } from '@/content/site'

// Social preview card, generated at build time. ImageResponse can't read the CSS theme tokens, so
// the colours below copy bg, fg, muted, accent and cyan from globals.css.
export const alt = `${site.name} (${site.alternateName}) · ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 96px',
        background: 'radial-gradient(circle at 85% 15%, #2a1f4d 0%, #090a10 55%)',
        color: '#e8eaf0',
      }}
    >
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          backgroundImage: 'linear-gradient(90deg, #a78bfa, #22d3ee)',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {site.name}
      </div>
      <div style={{ marginTop: 8, fontSize: 40, color: '#9399a8' }}>{site.alternateName}</div>
      <div style={{ marginTop: 40, fontSize: 44 }}>{site.role}</div>
      <div style={{ marginTop: 56, fontSize: 30, color: '#a78bfa' }}>
        {site.url.replace('https://', '')}
      </div>
    </div>,
    size,
  )
}
