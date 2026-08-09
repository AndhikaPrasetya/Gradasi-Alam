import {getTranslations, getLocale} from 'next-intl/server';
import {getContent} from '@/content';

export default async function Footer() {
  const t = await getTranslations('footer');
  const locale = await getLocale();
  const content = getContent(locale);

  return (
    <footer className="border-t border-onyx-olive/40 bg-forest-depths px-24 py-64 text-pure-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-24 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-aeonik text-heading font-semibold">Gradasi Alam</p>
          <p className="mt-8 max-w-[320px] text-body text-pale-fern">{content.about.body}</p>
        </div>
        <div className="flex flex-col gap-8 text-body text-pale-fern">
          <a href={`mailto:${content.contact.email}`} className="hover:text-pure-white">
            {content.contact.email}
          </a>
          <a
            href={`https://wa.me/${content.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pure-white"
          >
            WhatsApp
          </a>
          <p>{content.contact.address}</p>
        </div>
      </div>
      <p className="mx-auto mt-40 max-w-[1200px] text-caption text-lichen-sage">
        © {new Date().getFullYear()} Gradasi Alam. {t('rights')}
      </p>
    </footer>
  );
}
