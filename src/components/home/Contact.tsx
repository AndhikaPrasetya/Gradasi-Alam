import {getTranslations} from 'next-intl/server';
import type {SiteContent} from '@/content/types';

export default async function Contact({contact}: {contact: SiteContent['contact']}) {
  const t = await getTranslations('contact');

  return (
    <section id="kontak" className="bg-forest-depths px-24 py-80 text-center text-pure-white">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-24">
        <h2 className="font-ozik text-display">
          {t('heading')} <span className="text-electric-sprout">{t('headingAccent')}</span>
        </h2>
        <p className="text-body-md text-pale-fern">{contact.address}</p>
        <div className="flex flex-wrap items-center justify-center gap-16">
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-electric-sprout px-20 py-8 text-body-md font-medium text-onyx-olive transition-colors hover:bg-deep-verdant"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="rounded-pill border border-pure-white px-20 py-8 text-body-md font-medium text-pure-white transition-colors hover:bg-pure-white/10"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
