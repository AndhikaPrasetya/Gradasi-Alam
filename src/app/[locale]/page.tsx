import {getContent} from '@/content';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const content = getContent(locale);

  return (
    <main>
      <Hero hero={content.hero} />
      <About about={content.about} />
      <Services services={content.services} />
    </main>
  );
}
