import {getTranslations} from 'next-intl/server';
import type {SiteContent} from '@/content/types';

export default async function Hero({hero}: {hero: SiteContent['hero']}) {
  const t = await getTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-forest-depths px-24 pt-128 pb-80 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_var(--color-moss-shadow)_0%,_transparent_70%)] opacity-40"
      />
      <div className="relative mx-auto flex max-w-[800px] flex-col items-center gap-24">
        <span className="rounded-badges border border-lichen-sage px-16 py-4 text-body text-pure-white">
          {hero.badge}
        </span>
        <h1 className="font-ozik text-display-xl text-pure-white md:text-display-2xl">
          {hero.headline} <span className="text-electric-sprout">{hero.headlineAccent}</span>
        </h1>
        <p className="max-w-[640px] text-subheading text-pale-fern">{hero.subhead}</p>
        <div className="flex flex-wrap items-center justify-center gap-16">
          <a
            href="https://wa.me/6281222991625"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-electric-sprout px-20 py-8 text-body-md font-medium text-onyx-olive transition-colors hover:bg-deep-verdant"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#project"
            className="rounded-pill border border-pure-white px-20 py-8 text-body-md font-medium text-pure-white transition-colors hover:bg-pure-white/10"
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
