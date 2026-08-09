import {getContent} from '@/content';
import Hero from '@/components/home/Hero';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const content = getContent(locale);

  return (
    <main>
      <Hero hero={content.hero} />
    </main>
  );
}
