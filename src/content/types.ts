export type ProjectCategory = 'residential' | 'corporate' | 'indoor' | 'maintenance';

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
}

export interface SiteContent {
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subhead: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    stats: StatItem[];
  };
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  news: NewsItem[];
  contact: {
    address: string;
    email: string;
    whatsapp: string;
  };
}
