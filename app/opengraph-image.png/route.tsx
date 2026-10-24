import { ImageResponse } from 'next/og';
import { ogFonts } from '@/lib/og';
export const dynamic = 'force-static';
const size = { width: 1200, height: 630 };
export async function GET() {
  return new ImageResponse(
    <div
      style={{
        fontFamily: 'Instrument Sans',
        background: '#F7F5F0',
        color: '#1A1A1A',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px',
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 600, display: 'flex' }}>VAT Check GH</div>
      <div style={{ fontSize: 56, fontWeight: 400, display: 'flex', marginTop: 64 }}>
        Ghana digital VAT
      </div>
      <div style={{ fontSize: 24, display: 'flex', marginTop: 32 }}>
        Check a service. See the working.
      </div>
      <div style={{ fontSize: 20, marginTop: 64, display: 'flex' }}>
        Not affiliated with GRA. Not tax or legal advice.
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
