const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const fullDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export const formatMonthYear = (iso: string) => monthYear.format(new Date(iso))

export const formatDate = (iso: string) => fullDate.format(new Date(iso))

// FR-40: "Mar 2025 – Present".
export const formatDateRange = (start: string, end?: string | null) =>
  `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : 'Present'}`

// FR-40: "1 yr 8 mos", counting both the first and last month.
export function formatDuration(start: string, end?: string | null) {
  const from = new Date(start)
  const to = end ? new Date(end) : new Date()
  const months = Math.max(
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + to.getUTCMonth() - from.getUTCMonth() + 1,
    1,
  )
  const years = Math.floor(months / 12)
  const rest = months % 12
  return [
    years ? `${years} yr${years > 1 ? 's' : ''}` : '',
    rest ? `${rest} mo${rest > 1 ? 's' : ''}` : '',
  ]
    .filter(Boolean)
    .join(' ')
}
