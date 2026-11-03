// Relationship and upload fields hold either an ID or the populated document, depending on depth.
export function populated<T extends { id: string }>(
  value: string | T | null | undefined,
): T | null {
  return value && typeof value === 'object' ? value : null
}
