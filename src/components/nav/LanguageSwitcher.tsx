'use client';

import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div className="flex items-center gap-8 text-caption font-medium">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={
            locale === activeLocale
              ? 'text-pure-white'
              : 'text-lichen-sage transition-colors hover:text-pure-white'
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
