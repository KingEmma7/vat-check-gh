import type { Metadata } from 'next';
export const SITE_URL = 'https://vat-check-gh.etagbor.workers.dev';
export const FAQ_URL = 'https://gra.gov.gh/wp-content/uploads/2026/10/RTVAT-Approved-FAQ.pdf';
export const GRA_URL = 'https://gra.gov.gh/rtvat/';
export function pageMetadata(title: string, path: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: SITE_URL + path },
    openGraph: {
      title: `${title} | VAT Check GH`,
      description,
      url: SITE_URL + path,
      siteName: 'VAT Check GH',
      locale: 'en_GH',
      type: 'website',
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

export const REPOSITORY_URL = 'https://github.com/KingEmma7/vat-check-gh';
export const MERCHANT_ISSUE_URL = `${REPOSITORY_URL}/issues/new?template=wrong-merchant.md`;
