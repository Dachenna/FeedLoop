import { ImageResponse } from 'next/og'

export const runtime = 'edge'
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
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: '#34d399',
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 4, textTransform: 'uppercase', color: '#a1a1aa' }}>
            FeedLoop
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 980 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 600, letterSpacing: -2 }}>
            Stop collecting feedback you never read.
          </div>
          <div style={{ fontSize: 28, color: '#a1a1aa', lineHeight: 1.35 }}>
            Surveys, a response inbox, and an AI brief. Paystack, priced in naira.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#71717a' }}>
          <div>NPS · CSAT · public links</div>
          <div>feed-loop-two.vercel.app</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
