import {getContent} from '@/content';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Projects from '@/components/home/Projects';
import Testimonials from '@/components/home/Testimonials';
import NewsTeaser from '@/components/home/NewsTeaser';
import Contact from '@/components/home/Contact';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const content = getContent(locale);

  return (
    <main>
      <Hero hero={content.hero} />
      <About about={content.about} />
      <Services services={content.services} />
      <Projects projects={content.projects} />
      <Testimonials testimonials={content.testimonials} />
      <NewsTeaser news={content.news} />
      <Contact contact={content.contact} />
    </main>
  );
}
