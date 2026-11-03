// Shared layout for the dynamic Open Graph images (NFR-13). Rendered by next/og, so inline styles only.
// Colours match the dark "backwater" theme in globals.css.
export const ogSize = { width: 1200, height: 630 }

export function OgCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#0f1614',
        color: '#e8edea',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, color: '#9aa8a2' }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 7, background: '#5cc9b0' }} />
        {eyebrow}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 500, lineHeight: 1.1, letterSpacing: -2 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 34, color: '#9aa8a2', lineHeight: 1.35 }}>{subtitle}</div>
        )}
      </div>
    </div>
  )
}
