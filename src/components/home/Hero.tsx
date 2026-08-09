import {getTranslations} from 'next-intl/server';
import type {SiteContent} from '@/content/types';

function renderSubhead(subhead: string, highlight: string) {
  const index = subhead.indexOf(highlight);
  if (index === -1) return subhead;

  return (
    <>
      {subhead.slice(0, index)}
      <span className="text-electric-sprout">{highlight}</span>
      {subhead.slice(index + highlight.length)}
    </>
  );
}

export default async function Hero({hero}: {hero: SiteContent['hero']}) {
  const t = await getTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-forest-depths px-24 pt-128 pb-200 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-480 w-480 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-moss-shadow)_0%,transparent_70%)] opacity-40"
      />
      <div className="relative mx-auto flex max-w-800 flex-col items-center gap-24">
        <span className="rounded-full border border-lichen-sage px-16 py-4 text-body text-pure-white">
          {hero.badge}
        </span>
        <h1 className="font-ozik text-display-xl text-pure-white md:text-display-2xl">
          {hero.headline} <span className="text-electric-sprout">{hero.headlineAccent}</span>
        </h1>
        <p className="max-w-640 text-subheading text-pale-fern">
          {renderSubhead(hero.subhead, hero.subheadHighlight)}
        </p>
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
      <div
        aria-hidden
        className="pointer-events-none relative mx-auto mt-64 hidden h-160 w-560 max-w-full md:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG placeholder, swapped once real project photos exist */}
        <img
          src="/images/projects/corporate-1.svg"
          alt=""
          className="absolute left-0 top-0 h-140 w-260 -rotate-6 rounded-cards object-cover opacity-90 shadow-[0_24px_60px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.2)]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG placeholder, swapped once real project photos exist */}
        <img
          src="/images/projects/residential-1.svg"
          alt=""
          className="absolute right-0 top-8 h-150 w-280 rotate-6 rounded-cards object-cover shadow-[0_24px_60px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.2)]"
        />
      </div>
    </section>
  );
}
