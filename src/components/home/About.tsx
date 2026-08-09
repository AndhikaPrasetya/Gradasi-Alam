import type {SiteContent} from '@/content/types';

export default function About({about}: {about: SiteContent['about']}) {
  return (
    <section id="tentang" className="bg-pure-white px-24 py-80 text-onyx-olive">
      <div className="mx-auto flex max-w-1200 flex-col items-center gap-24 text-center">
        <span className="rounded-badges bg-sprout-wash px-12 py-4 text-caption font-medium text-moss-shadow">
          {about.eyebrow}
        </span>
        <h2 className="max-w-640 font-aeonik text-heading-lg font-bold">{about.heading}</h2>
        <p className="max-w-640 text-body-md text-onyx-olive/80">{about.body}</p>
        <div className="mt-16 flex flex-wrap justify-center gap-40">
          {about.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-ozik text-heading-lg text-onyx-olive">{stat.value}</span>
              <span className="text-caption text-onyx-olive/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
