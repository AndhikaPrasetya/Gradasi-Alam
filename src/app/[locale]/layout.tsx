import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Boldonse, Geist, Instrument_Serif} from 'next/font/google';
import {routing} from '@/i18n/routing';
import FloatingNav from '@/components/nav/FloatingNav';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const boldonse = Boldonse({subsets: ['latin'], weight: '400', variable: '--font-boldonse'});
const geist = Geist({subsets: ['latin'], variable: '--font-geist'});
const instrumentSerif = Instrument_Serif({subsets: ['latin'], weight: '400', variable: '--font-serif-instrument'});

export const metadata: Metadata = {
  title: 'Gradasi Alam — Exterior Design & Landscaping',
  description:
    'Menciptakan ruang eksterior yang nyaman: taman, vertical garden, dan perawatan tanaman untuk hunian, korporat, dan komersial.'
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${boldonse.variable} ${geist.variable} ${instrumentSerif.variable} bg-forest-depths font-aeonik text-pure-white antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <FloatingNav />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
