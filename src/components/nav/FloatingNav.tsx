import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import LanguageSwitcher from './LanguageSwitcher';

export default async function FloatingNav() {
  const t = await getTranslations('nav');

  const links = [
    {href: '#tentang', label: t('about')},
    {href: '#layanan', label: t('services')},
    {href: '#project', label: t('projects')},
    {href: '#testimoni', label: t('testimonials')},
    {href: '#kontak', label: t('contact')}
  ];

  return (
    <header className="sticky top-24 z-50 mx-auto flex w-[calc(100%-48px)] max-w-[1200px] items-center justify-between gap-16 rounded-nav bg-onyx-olive/90 px-24 py-12 backdrop-blur">
      <Link href="#" className="font-aeonik text-body-md font-semibold text-pure-white">
        Gradasi Alam
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-buttons px-12 py-8 text-body font-medium text-lichen-sage transition-colors hover:text-pure-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-16">
        <LanguageSwitcher />
        <a
          href="https://wa.me/6281222991625"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-pill bg-electric-sprout px-20 py-8 text-body font-medium text-onyx-olive transition-colors hover:bg-deep-verdant"
        >
          {t('cta')}
        </a>
      </div>
    </header>
  );
}
