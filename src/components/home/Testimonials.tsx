import {getTranslations} from 'next-intl/server';
import type {TestimonialItem} from '@/content/types';

export default async function Testimonials({testimonials}: {testimonials: TestimonialItem[]}) {
  const t = await getTranslations('testimonials');

  return (
    <section id="testimoni" className="bg-pure-white px-24 py-80">
      <div className="mx-auto max-w-1200">
        <h2 className="mb-40 text-center font-aeonik text-heading-lg font-bold text-onyx-olive">
          {t('heading')}
        </h2>
        <div className="grid gap-24 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className="rounded-cards border border-onyx-olive/10 bg-bone-white px-24 py-32">
              <p className="font-instrument-serif text-subheading text-onyx-olive">&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-16 text-body font-medium text-onyx-olive">
                {testimonial.name}
                <span className="block text-caption font-normal text-onyx-olive/60">{testimonial.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
