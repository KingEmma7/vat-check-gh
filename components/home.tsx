'use client';
import MerchantSearch from './search/merchant-search';
import { useLanguage } from '@/lib/i18n';
import { Source } from './ui/source';
export default function Home() {
  const { locale, t } = useLanguage();
  return (
    <div className="page-container instrument">
      <h1 className="home-title" lang={locale}>
        {locale === 'tw' ? t.home : 'Check a digital service.'}
      </h1>
      {locale === 'en' && (
        <p className="home-intro">
          Search Ghana’s published merchant list and explore VAT estimates.
        </p>
      )}
      <MerchantSearch />
      <div className="empty-state">
        <p lang={locale}>
          {locale === 'tw'
            ? 'Hwehwɛ dwumadie bi anaa adetɔnfoɔ din.'
            : 'Search a service or the seller on your receipt.'}
        </p>
        <p>
          Check its place on GRA’s registered merchant list. Registration alone does not confirm
          that a price includes tax.
        </p>
        <Source questions="14–15" />
      </div>
      <noscript>
        <p>
          Interactive search needs JavaScript. Static results are available for{' '}
          <a href="/check/netflix/">Netflix</a>, <a href="/check/chatgpt/">ChatGPT</a> and{' '}
          <a href="/check/spotify/">Spotify</a>.
        </p>
      </noscript>
    </div>
  );
}
