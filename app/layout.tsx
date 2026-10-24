import type { Metadata, Viewport } from 'next';
import '@fontsource/instrument-sans/latin-400.css';

import '@fontsource/instrument-sans/latin-600.css';

import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import { Header, Footer } from '@/components/ui/shell';
import Offline from '@/components/offline';
import { SITE_URL } from '@/lib/seo';
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'VAT Check GH | Your digital VAT, explained', template: '%s | VAT Check GH' },
  description:
    'Check Ghana’s official digital merchant list, estimate VAT and understand charges on foreign digital services.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: 'VAT Check GH',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'VAT Check GH. Check Ghana digital VAT.',
      },
    ],
  },
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F7F5F0' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body lang="en">
        <LanguageProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <Offline />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
