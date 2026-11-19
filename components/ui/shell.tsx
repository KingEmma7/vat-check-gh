'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, TranslatedText } from '@/lib/i18n';
import { sourceDateLabel, merchantSourceUrl } from '@/lib/source';
import { GRA_URL } from '@/lib/seo';
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="VAT Check GH home">
      <Image src="/brand-mark.svg" width={44} height={44} alt="" />
      <span>VAT Check GH</span>
    </Link>
  );
}
export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Brand />
      </div>
    </header>
  );
}
export function Footer() {
  const { locale, setLocale } = useLanguage();
  return (
    <footer className="footer">
      <button
        className="language"
        onClick={() => setLocale(locale === 'en' ? 'tw' : 'en')}
        aria-label={locale === 'en' ? 'Switch to Twi' : 'Switch to English'}
      >
        {locale === 'en' ? 'Twi' : 'English'}
      </button>
      <nav aria-label="Tools and information">
        <Link prefetch={false} lang={locale} href="/">
          <TranslatedText id="home" />
        </Link>
        <Link prefetch={false} lang={locale} href="/calculator/">
          <TranslatedText id="calculator" />
        </Link>
        <Link prefetch={false} lang={locale} href="/apply/">
          <TranslatedText id="apply" />
        </Link>
        <Link prefetch={false} lang={locale} href="/double-charge/">
          <TranslatedText id="doubleCharge" />
        </Link>
        <Link prefetch={false} lang={locale} href="/faq/">
          <TranslatedText id="faq" />
        </Link>
        <Link prefetch={false} lang={locale} href="/about/">
          <TranslatedText id="about" />
        </Link>
      </nav>
      <p>
        <TranslatedText id="dataAsOf" /> <strong>{sourceDateLabel}</strong>.<br />
        <a href={merchantSourceUrl}>Official merchant list</a> · <a href={GRA_URL}>GRA guidance</a>
      </p>
      <p>
        <TranslatedText id="disclaimer" />
      </p>
      {locale === 'tw' && (
        <p className="translation-note">
          <TranslatedText id="review" />
        </p>
      )}
      <p>Free. Open source. No tracking.</p>
    </footer>
  );
}
