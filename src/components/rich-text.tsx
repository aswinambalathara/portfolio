import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/utils'

type Data = { root: unknown; [key: string]: unknown } | null | undefined

function hasText(node: unknown): boolean {
  if (typeof node !== 'object' || node === null) return false
  if ('text' in node && typeof node.text === 'string' && node.text.trim()) return true
  if ('type' in node && (node.type === 'upload' || node.type === 'block')) return true
  return 'children' in node && Array.isArray(node.children) && node.children.some(hasText)
}

// NFR-42: an editor that was opened and saved empty still holds an empty paragraph.
export const hasRichText = (data: Data) => Boolean(data && hasText(data.root))

export function RichText({ data, className }: { data: Data; className?: string }) {
  if (!data || !hasRichText(data)) return null
  return (
    <LexicalRichText
      data={data as unknown as SerializedEditorState}
      className={cn('rich-text', className)}
    />
  )
}
