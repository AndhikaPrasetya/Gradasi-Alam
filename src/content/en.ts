import type {SiteContent} from './types';

const en: SiteContent = {
  hero: {
    badge: '655+ Projects in 17 Cities',
    headline: 'We Create A Leisure',
    headlineAccent: 'Space',
    subhead:
      'Since 2018, Gradasi Alam has designed and maintained gardens, vertical gardens, and green spaces for residential, corporate, and commercial properties across Indonesia.',
    subheadHighlight: 'vertical gardens'
  },
  about: {
    eyebrow: 'About Us',
    heading: 'Your Partner From Concept To Completion',
    body: 'We work alongside every client from the initial site survey and design concept through construction and long-term maintenance — keeping your exterior space green and comfortable all year round.',
    stats: [
      {value: '2018', label: 'Operating since'},
      {value: '655+', label: 'Projects completed'},
      {value: '17', label: 'Cities in Indonesia'}
    ]
  },
  services: [
    {
      id: 'exterior-design',
      title: 'Exterior Design',
      description: 'Site surveys, working drawings, and design analysis to plan an exterior space that fits your needs.'
    },
    {
      id: 'complete-construction',
      title: 'Complete Construction',
      description: 'End-to-end hardscape, softscape, ponds, and vertical garden construction, fully integrated.'
    },
    {
      id: 'intensive-maintenance',
      title: 'Intensive Maintenance',
      description: 'Irrigation upkeep, plant care, and macro maintenance to keep your garden in shape.'
    },
    {
      id: 'planting-renting',
      title: 'Planting & Renting',
      description: 'Indoor plant rentals in a range of sizes for offices and events.'
    }
  ],
  projects: [
    {id: 'residential-1', title: 'Private Residence Garden, Bogor', category: 'residential', image: '/images/projects/residential-1.svg'},
    {id: 'residential-2', title: 'Residential Vertical Garden, Depok', category: 'residential', image: '/images/projects/residential-2.svg'},
    {id: 'corporate-1', title: 'Corporate Office Landscape, Jakarta', category: 'corporate', image: '/images/projects/corporate-1.svg'},
    {id: 'indoor-1', title: 'Lobby Plant Styling, Jakarta', category: 'indoor', image: '/images/projects/indoor-1.svg'},
    {id: 'maintenance-1', title: 'Scheduled Garden Maintenance, Tangerang', category: 'maintenance', image: '/images/projects/maintenance-1.svg'},
    {id: 'corporate-2', title: 'Rooftop Garden, Commercial Building, Bekasi', category: 'corporate', image: '/images/projects/corporate-2.svg'}
  ],
  testimonials: [
    {id: 'client-1', name: 'Residential Client', role: 'Homeowner, Bogor', quote: 'The Gradasi Alam team was very communicative and the finished garden exceeded our expectations.'},
    {id: 'client-2', name: 'Corporate Client', role: 'Facilities Manager, Jakarta', quote: 'The process from design to maintenance was smooth — our office feels much greener now.'},
    {id: 'client-3', name: 'Maintenance Client', role: 'Building Manager, Tangerang', quote: 'Scheduled maintenance keeps the garden looking great without us having to worry about it.'}
  ],
  news: [
    {id: 'news-1', title: 'Exterior Design Trends for 2026', excerpt: 'A roundup of the garden and green space styles gaining popularity this year.'},
    {id: 'news-2', title: 'Caring For Vertical Gardens In The Rainy Season', excerpt: 'Tips for keeping vertical gardens healthy through heavy rainfall.'},
    {id: 'news-3', title: 'Choosing Indoor Plants For The Office', excerpt: 'A guide to picking indoor plants that tolerate low-light rooms.'}
  ],
  contact: {
    address: 'Jl. Akasia Raya No. 24, Bogor, Indonesia',
    email: 'gradasi.alam@gmail.com',
    whatsapp: '6281222991625'
  }
};

export default en;
