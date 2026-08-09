'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import type {ProjectCategory, ProjectItem} from '@/content/types';

const CATEGORIES: {key: ProjectCategory | 'all'; labelKey: string}[] = [
  {key: 'all', labelKey: 'filterAll'},
  {key: 'residential', labelKey: 'filterResidential'},
  {key: 'corporate', labelKey: 'filterCorporate'},
  {key: 'indoor', labelKey: 'filterIndoor'},
  {key: 'maintenance', labelKey: 'filterMaintenance'}
];

export default function Projects({projects}: {projects: ProjectItem[]}) {
  const t = useTranslations('projects');
  const [active, setActive] = useState<ProjectCategory | 'all'>('all');

  const filtered = active === 'all' ? projects : projects.filter((project) => project.category === active);

  return (
    <section id="project" className="bg-forest-depths px-24 py-80">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-24 text-center font-aeonik text-heading-lg font-semibold text-pure-white">
          {t('heading')}
        </h2>
        <div className="mb-40 flex flex-wrap justify-center gap-8">
          {CATEGORIES.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActive(category.key)}
              className={`rounded-buttons px-16 py-8 text-body font-medium transition-colors ${
                active === category.key ? 'bg-electric-sprout text-onyx-olive' : 'text-lichen-sage hover:text-pure-white'
              }`}
            >
              {t(category.labelKey)}
            </button>
          ))}
        </div>
        <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <figure key={project.id} className="overflow-hidden rounded-cards bg-onyx-olive">
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG placeholder, swapped for next/image once real photos are supplied */}
              <img src={project.image} alt={project.title} className="h-[240px] w-full object-cover" />
              <figcaption className="px-16 py-12 text-body font-medium text-pure-white">{project.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
