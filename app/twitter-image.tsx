import { ImageResponse } from 'next/og'
import OpenGraphImage, { alt, size, contentType } from './opengraph-image'

export const runtime = 'nodejs'
export { alt, size, contentType }

export default function TwitterImage() {
  return OpenGraphImage()
}
