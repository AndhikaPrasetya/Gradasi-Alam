import {getTranslations} from 'next-intl/server';
import type {SiteContent} from '@/content/types';

export default async function Services({services}: {services: SiteContent['services']}) {
  const t = await getTranslations('services');

  return (
    <section id="layanan" className="bg-bone-white px-24 py-80">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-40 text-center font-aeonik text-heading-lg font-semibold text-onyx-olive">
          {t('heading')}
        </h2>
        <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.id} className="rounded-cards border border-onyx-olive/10 bg-pure-white px-24 py-32">
              <h3 className="mb-8 text-heading-sm font-semibold text-onyx-olive">{service.title}</h3>
              <p className="text-body text-onyx-olive/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
