import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'FeedLoop — Stop collecting feedback you never read'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090b',
          color: '#fafafa',
          padding: '72px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 4, color: '#a1a1aa' }}>
          FEEDLOOP
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 600 }}>
            Stop collecting feedback you never read.
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: '#a1a1aa' }}>
            Surveys, an inbox, and an AI brief. Priced in USD.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 22, color: '#71717a' }}>
          United States · Canada · Germany
        </div>
      </div>
    ),
    { ...size }
  )
}
