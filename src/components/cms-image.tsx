import Image, { type ImageProps } from 'next/image'

import type { Media } from '@/payload-types'

type Size = keyof NonNullable<Media['sizes']>

// NFR-02: Payload uploads through next/image, using a pre-generated size when one is given.
export function CmsImage({
  media,
  size,
  ...props
}: { media: Media; size?: Size } & Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) {
  const variant = size ? media.sizes?.[size] : undefined
  const src = variant?.url ?? media.url
  const width = variant?.width ?? media.width
  const height = variant?.height ?? media.height
  if (!src || !width || !height) return null

  return <Image src={src} alt={media.alt} width={width} height={height} {...props} />
}
