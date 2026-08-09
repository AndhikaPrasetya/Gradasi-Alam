import {getTranslations} from 'next-intl/server';
import type {NewsItem} from '@/content/types';

export default async function NewsTeaser({news}: {news: NewsItem[]}) {
  const t = await getTranslations('news');

  return (
    <section className="bg-bone-white px-24 py-80">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-40 flex items-center justify-between">
          <h2 className="font-aeonik text-heading-lg font-semibold text-onyx-olive">{t('heading')}</h2>
          <span className="rounded-badges bg-sprout-wash px-12 py-4 text-caption font-medium text-moss-shadow">
            {t('comingSoon')}
          </span>
        </div>
        <div className="grid gap-24 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.id} className="rounded-cards border border-onyx-olive/10 bg-pure-white px-24 py-32">
              <h3 className="mb-8 text-heading-sm font-semibold text-onyx-olive">{item.title}</h3>
              <p className="text-body text-onyx-olive/70">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
