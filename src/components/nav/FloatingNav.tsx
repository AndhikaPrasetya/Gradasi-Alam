'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function FloatingNav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    {href: '#tentang', label: t('about')},
    {href: '#layanan', label: t('services')},
    {href: '#project', label: t('projects')},
    {href: '#testimoni', label: t('testimonials')},
    {href: '#kontak', label: t('contact')}
  ];

  return (
    <header
      className={`sticky top-24 z-50 mx-auto flex w-[calc(100%-48px)] max-w-1200 items-center justify-between gap-16 rounded-nav px-24 py-12 transition-colors duration-300 ${
        scrolled ? 'bg-onyx-olive/90 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur' : 'bg-transparent'
      }`}
    >
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
