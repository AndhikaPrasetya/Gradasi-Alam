# Gradasi Alam Homepage Revamp — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new bilingual (ID/EN) Next.js homepage for Gradasi Alam applying the "Tomorro" style reference in `design.md`, with content adapted from the current gradasialam.com site.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind v4, with `next-intl` for `/id` and `/en` locale-prefixed routing. All content is static (no CMS, no backend, no forms) — structured content lives in typed per-locale data files, UI chrome strings live in next-intl message files. The homepage is one page composed of nine section components inside a shared floating-nav + footer layout.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind v4 (CSS-first `@theme`), next-intl, next/font/google (Boldonse, Geist, Instrument Serif).

**Spec:** `docs/superpowers/specs/2026-08-09-homepage-revamp-design.md`

## Global Constraints

- No automated test suite this phase — verification is `npm run build` (type/lint correctness) plus manual browser checks. Do not add a test runner.
- No backend, API routes, database, or contact form. The only contact mechanism is a `wa.me` link to `+6281222991625`.
- Bilingual from the start: locales are `id` (default) and `en`, routed as `/id/...` and `/en/...` via next-intl middleware.
- No real project photography yet — placeholders are hand-authored SVG files under `public/images/projects/`, referenced with plain `<img>` (not `next/image`, which is unnecessary for static SVGs and would require extra SVG-security config). Swapping in real photos later is a file replacement + switching to `next/image`, tracked as a future-phase item, not part of this plan.
- Testimonials use generic client-role labels ("Klien Residential", etc.), never quotes attributed to specific named real people — real testimonial text/attribution is a future-phase content update, not invented here.
- Tailwind's spacing scale is overridden to `--spacing: 1px`, so utility numbers map 1:1 to pixels (`p-8` = 8px, `gap-24` = 24px), matching design.md's px-named spacing scale. Do not reintroduce Tailwind's default 4px-multiplier spacing utilities alongside this — it would create two conflicting meanings for the same class names.
- Color, radius, and type-scale Tailwind utilities come from the `@theme` block in `src/app/globals.css` — always prefer these named tokens (`bg-forest-depths`, `rounded-cards`, `text-heading-lg`, etc.) over arbitrary Tailwind values or hex literals in component code.
- Fonts: Ozik → **Boldonse**, Aeonik → **Geist**, Instrument Serif → **Instrument Serif** (all via `next/font/google`), matching design.md's own suggested substitutes.

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: entire Next.js project skeleton in `c:\gradasi-alam-revamp` (package.json, tsconfig.json, src/app/*, public/*, etc.) via `create-next-app`.

**Interfaces:**
- Produces: a working Next.js 15 + TypeScript + Tailwind v4 + App Router project with `src/` directory and `@/*` import alias, runnable via `npm run dev` and `npm run build`.

- [ ] **Step 1: Run create-next-app in the current directory**

Run (from `c:\gradasi-alam-revamp`):

```bash
npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --turbopack --import-alias "@/*"
```

If prompted "current directory is not empty, continue?", confirm yes — `design.md` and `docs/` are unrelated to the scaffold and will be left untouched.

- [ ] **Step 2: Verify the scaffold builds and runs**

Run: `npm run build`
Expected: build succeeds with the default Next.js starter page.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project"
```

---

### Task 2: Add the design.md Tailwind v4 theme to globals.css

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: nothing (first design-system task).
- Produces: Tailwind utility classes for every color (`bg-forest-depths`, `text-electric-sprout`, ...), type-scale (`text-caption` … `text-display-2xl`, each carrying line-height + letter-spacing), spacing (`p-N`/`gap-N`/`px-N` = N pixels for any N), and named radii (`rounded-nav`, `rounded-cards`, `rounded-badges`, `rounded-buttons`, `rounded-pill`). Later tasks rely on these exact class names. Font family utilities (`font-ozik`, `font-aeonik`, `font-instrument-serif`) are declared here but only resolve to real fonts once Task 5 sets the `--font-boldonse`, `--font-geist`, `--font-serif-instrument` CSS variables via `next/font`.

- [ ] **Step 1: Replace the contents of `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  /* Colors — from design.md Tokens: Colors */
  --color-forest-depths: #122314;
  --color-moss-shadow: #273f2b;
  --color-lichen-sage: #7e8371;
  --color-pale-fern: #b7bda5;
  --color-electric-sprout: #68ef3f;
  --color-deep-verdant: #26a200;
  --color-sprout-wash: #e7f9dd;
  --color-mist-green: #d9deca;
  --color-onyx-olive: #30322a;
  --color-pure-white: #ffffff;
  --color-bone-white: #f2f5eb;
  --color-soft-mist: #dcdfe3;
  --color-cool-stone: #d6d6d6;
  --color-carbon: #222222;

  /* Fonts — aliases into next/font CSS variables set on <body> in Task 5 */
  --font-ozik: var(--font-boldonse), ui-sans-serif, system-ui, sans-serif;
  --font-aeonik: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-instrument-serif: var(--font-serif-instrument), ui-serif, Georgia, serif;

  /* Type scale — from design.md Type Scale table (size + line-height + letter-spacing) */
  --text-caption: 12px;
  --text-caption--line-height: 1.5;
  --text-caption--letter-spacing: -0.036px;
  --text-body: 14px;
  --text-body--line-height: 1.5;
  --text-body--letter-spacing: -0.042px;
  --text-body-md: 16px;
  --text-body-md--line-height: 1.5;
  --text-body-md--letter-spacing: -0.496px;
  --text-subheading: 18px;
  --text-subheading--line-height: 1.5;
  --text-subheading--letter-spacing: -0.378px;
  --text-heading-sm: 20px;
  --text-heading-sm--line-height: 1.43;
  --text-heading-sm--letter-spacing: -0.3px;
  --text-heading: 24px;
  --text-heading--line-height: 1.33;
  --text-heading--letter-spacing: -0.36px;
  --text-heading-lg: 32px;
  --text-heading-lg--line-height: 1.2;
  --text-heading-lg--letter-spacing: -0.672px;
  --text-display: 40px;
  --text-display--line-height: 1.2;
  --text-display--letter-spacing: -1.24px;
  --text-display-xl: 56px;
  --text-display-xl--line-height: 0.86;
  --text-display-xl--letter-spacing: -0.784px;
  --text-display-2xl: 80px;
  --text-display-2xl--line-height: 0.9;
  --text-display-2xl--letter-spacing: -0.8px;

  /* Spacing — base unit becomes 1px so utility numbers map 1:1 to px
     (p-8 = 8px, gap-24 = 24px), matching design.md's px-named spacing scale. */
  --spacing: 1px;

  /* Named radii — from design.md Components / Border Radius */
  --radius-nav: 28px;
  --radius-cards: 20px;
  --radius-badges: 28px;
  --radius-buttons: 8px;
  --radius-pill: 28px;
}

body {
  background-color: var(--color-pure-white);
}
```

- [ ] **Step 2: Verify build still succeeds**

Run: `npm run build`
Expected: build succeeds (the default starter page will look unstyled/broken since its own markup will be replaced in Task 3 — that's expected).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add design.md Tailwind v4 theme tokens"
```

---

### Task 3: Set up next-intl locale routing

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/request.ts`
- Create: `middleware.ts` (project root)
- Modify: `next.config.ts`
- Create: `messages/id.json`
- Create: `messages/en.json`
- Modify: `src/app/layout.tsx` (becomes a no-op passthrough; the real `<html>`/`<body>` moves to `src/app/[locale]/layout.tsx` in Task 5)
- Delete: `src/app/page.tsx`, `src/app/globals.css` moves are not needed — `globals.css` stays at `src/app/globals.css` and is imported from `src/app/[locale]/layout.tsx` in Task 5.

**Interfaces:**
- Produces: `routing` (locales `['id', 'en']`, defaultLocale `'id'`) from `@/i18n/routing`; `{Link, usePathname, useRouter}` from `@/i18n/navigation`; middleware that redirects `/` → `/id` and serves `/en/...`. Later tasks import `getTranslations`/`useTranslations` scoped to the namespaces defined in `messages/*.json`: `nav`, `hero`, `services`, `projects`, `testimonials`, `news`, `contact`, `footer`.

- [ ] **Step 1: Install next-intl**

```bash
npm install next-intl
```

- [ ] **Step 2: Create `src/i18n/routing.ts`**

```ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id'
});
```

- [ ] **Step 3: Create `src/i18n/navigation.ts`**

```ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);
```

- [ ] **Step 4: Create `src/i18n/request.ts`**

```ts
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

- [ ] **Step 5: Create `middleware.ts` at the project root**

```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

- [ ] **Step 6: Wire the plugin into `next.config.ts`**

```ts
import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Create `messages/id.json`**

```json
{
  "nav": {
    "about": "Tentang",
    "services": "Layanan",
    "projects": "Project",
    "testimonials": "Testimoni",
    "contact": "Kontak",
    "cta": "Hubungi via WhatsApp"
  },
  "hero": {
    "ctaPrimary": "Hubungi via WhatsApp",
    "ctaSecondary": "Lihat Project"
  },
  "services": {
    "heading": "Layanan Kami"
  },
  "projects": {
    "heading": "Project Kami",
    "filterAll": "Semua",
    "filterResidential": "Residential",
    "filterCorporate": "Corporate",
    "filterIndoor": "Indoor",
    "filterMaintenance": "Maintenance"
  },
  "testimonials": {
    "heading": "Apa Kata Mereka"
  },
  "news": {
    "heading": "Berita Terbaru",
    "comingSoon": "Segera hadir"
  },
  "contact": {
    "heading": "Mari",
    "headingAccent": "Wujudkan",
    "ctaPrimary": "Hubungi via WhatsApp"
  },
  "footer": {
    "rights": "Seluruh hak cipta dilindungi."
  }
}
```

- [ ] **Step 8: Create `messages/en.json`**

```json
{
  "nav": {
    "about": "About",
    "services": "Services",
    "projects": "Projects",
    "testimonials": "Testimonials",
    "contact": "Contact",
    "cta": "Chat on WhatsApp"
  },
  "hero": {
    "ctaPrimary": "Chat on WhatsApp",
    "ctaSecondary": "View Projects"
  },
  "services": {
    "heading": "Our Services"
  },
  "projects": {
    "heading": "Our Projects",
    "filterAll": "All",
    "filterResidential": "Residential",
    "filterCorporate": "Corporate",
    "filterIndoor": "Indoor",
    "filterMaintenance": "Maintenance"
  },
  "testimonials": {
    "heading": "What Clients Say"
  },
  "news": {
    "heading": "Latest News",
    "comingSoon": "Coming soon"
  },
  "contact": {
    "heading": "Let's",
    "headingAccent": "Build It",
    "ctaPrimary": "Chat on WhatsApp"
  },
  "footer": {
    "rights": "All rights reserved."
  }
}
```

- [ ] **Step 9: Delete the default `src/app/page.tsx`**

It will be replaced by `src/app/[locale]/page.tsx` in Task 6.

```bash
rm src/app/page.tsx
```

- [ ] **Step 10: Replace `src/app/layout.tsx` with a no-op passthrough**

The real `<html>`/`<body>` (with fonts and providers) is defined per-locale in `src/app/[locale]/layout.tsx`, added in Task 5.

```tsx
export default function RootLayout({children}: {children: React.ReactNode}) {
  return children;
}
```

- [ ] **Step 11: Verify the dev server redirects `/` to `/id`**

Run: `npm run dev`, then open `http://localhost:3000/` in a browser.
Expected: it redirects to `http://localhost:3000/id` and shows a blank/error page (no `[locale]` route exists yet — that's expected, confirmed in Task 5). Stop the dev server after checking.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: set up next-intl locale routing"
```

---

### Task 4: Content data layer

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/id.ts`
- Create: `src/content/en.ts`
- Create: `src/content/index.ts`

**Interfaces:**
- Produces: `SiteContent`, `ServiceItem`, `ProjectItem`, `TestimonialItem`, `NewsItem`, `ProjectCategory`, `StatItem` types from `@/content/types`; `getContent(locale: string): SiteContent` from `@/content`. Section components (Tasks 6-10) consume `getContent(locale)` output.

- [ ] **Step 1: Create `src/content/types.ts`**

```ts
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
```

- [ ] **Step 2: Create `src/content/id.ts`**

```ts
import type {SiteContent} from './types';

const id: SiteContent = {
  hero: {
    badge: '655+ Proyek di 17 Kota',
    headline: 'Kami Ciptakan Ruang',
    headlineAccent: 'Asri',
    subhead:
      'Sejak 2018, Gradasi Alam merancang dan merawat taman, vertical garden, dan ruang hijau untuk hunian, korporat, dan komersial di seluruh Indonesia.'
  },
  about: {
    eyebrow: 'Tentang Kami',
    heading: 'Mitra Anda dari Konsep hingga Selesai',
    body: 'Kami mendampingi setiap klien mulai dari survei lokasi dan konsep desain, hingga konstruksi dan perawatan jangka panjang — memastikan ruang eksterior Anda tetap hijau dan nyaman sepanjang waktu.',
    stats: [
      {value: '2018', label: 'Beroperasi sejak'},
      {value: '655+', label: 'Proyek selesai'},
      {value: '17', label: 'Kota di Indonesia'}
    ]
  },
  services: [
    {
      id: 'exterior-design',
      title: 'Exterior Design',
      description: 'Survei lokasi, gambar kerja, dan analisis desain untuk merancang ruang eksterior yang sesuai kebutuhan Anda.'
    },
    {
      id: 'complete-construction',
      title: 'Complete Construction',
      description: 'Pengerjaan hardscape, softscape, kolam, hingga vertical garden secara menyeluruh dan terintegrasi.'
    },
    {
      id: 'intensive-maintenance',
      title: 'Intensive Maintenance',
      description: 'Perawatan irigasi, perawatan tanaman, dan pemeliharaan makro agar taman Anda tetap terjaga.'
    },
    {
      id: 'planting-renting',
      title: 'Planting & Renting',
      description: 'Penyewaan tanaman indoor dalam berbagai ukuran untuk kebutuhan kantor dan acara.'
    }
  ],
  projects: [
    {id: 'residential-1', title: 'Taman Rumah Tinggal, Bogor', category: 'residential', image: '/images/projects/residential-1.svg'},
    {id: 'residential-2', title: 'Vertical Garden Hunian, Depok', category: 'residential', image: '/images/projects/residential-2.svg'},
    {id: 'corporate-1', title: 'Lanskap Kantor Korporat, Jakarta', category: 'corporate', image: '/images/projects/corporate-1.svg'},
    {id: 'indoor-1', title: 'Plant Styling Lobby, Jakarta', category: 'indoor', image: '/images/projects/indoor-1.svg'},
    {id: 'maintenance-1', title: 'Perawatan Taman Berkala, Tangerang', category: 'maintenance', image: '/images/projects/maintenance-1.svg'},
    {id: 'corporate-2', title: 'Rooftop Garden Gedung Komersial, Bekasi', category: 'corporate', image: '/images/projects/corporate-2.svg'}
  ],
  testimonials: [
    {id: 'klien-1', name: 'Klien Residential', role: 'Pemilik Rumah, Bogor', quote: 'Tim Gradasi Alam sangat komunikatif dan hasil tamannya melebihi ekspektasi kami.'},
    {id: 'klien-2', name: 'Klien Korporat', role: 'Manajer Fasilitas, Jakarta', quote: 'Proses dari desain sampai perawatan berjalan rapi, kantor kami jadi lebih asri.'},
    {id: 'klien-3', name: 'Klien Maintenance', role: 'Pengelola Gedung, Tangerang', quote: 'Perawatan berkala membuat taman selalu terlihat terawat tanpa kami perlu repot.'}
  ],
  news: [
    {id: 'news-1', title: 'Tren Desain Eksterior 2026', excerpt: 'Rangkuman gaya taman dan ruang hijau yang banyak dicari tahun ini.'},
    {id: 'news-2', title: 'Merawat Vertical Garden di Musim Hujan', excerpt: 'Tips menjaga vertical garden tetap sehat saat curah hujan tinggi.'},
    {id: 'news-3', title: 'Memilih Tanaman Indoor untuk Kantor', excerpt: 'Panduan memilih tanaman indoor yang tahan ruangan minim cahaya.'}
  ],
  contact: {
    address: 'Jl. Akasia Raya No. 24, Bogor, Indonesia',
    email: 'gradasi.alam@gmail.com',
    whatsapp: '6281222991625'
  }
};

export default id;
```

- [ ] **Step 3: Create `src/content/en.ts`**

```ts
import type {SiteContent} from './types';

const en: SiteContent = {
  hero: {
    badge: '655+ Projects in 17 Cities',
    headline: 'We Create A Leisure',
    headlineAccent: 'Space',
    subhead:
      'Since 2018, Gradasi Alam has designed and maintained gardens, vertical gardens, and green spaces for residential, corporate, and commercial properties across Indonesia.'
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
```

- [ ] **Step 4: Create `src/content/index.ts`**

```ts
import type {SiteContent} from './types';
import id from './id';
import en from './en';

const contentByLocale: Record<string, SiteContent> = {id, en};

export function getContent(locale: string): SiteContent {
  return contentByLocale[locale] ?? contentByLocale.id;
}
```

- [ ] **Step 5: Verify the project still type-checks**

Run: `npm run build`
Expected: build succeeds (these files aren't imported anywhere yet, so this just confirms no TypeScript errors in the new files).

- [ ] **Step 6: Commit**

```bash
git add src/content
git commit -m "feat: add bilingual content data layer"
```

---

### Task 5: Locale layout with fonts, nav, and footer

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/components/nav/FloatingNav.tsx`
- Create: `src/components/nav/LanguageSwitcher.tsx`
- Create: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `routing` from `@/i18n/routing`, `Link`/`usePathname` from `@/i18n/navigation`, `getContent` from `@/content`, messages namespaces `nav` and `footer`.
- Produces: the `[locale]` route shell (`<html>`, fonts, `NextIntlClientProvider`, floating nav + footer wrapping `{children}`) that Task 6's `page.tsx` renders into.

- [ ] **Step 1: Create `src/components/nav/LanguageSwitcher.tsx`**

```tsx
'use client';

import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div className="flex items-center gap-8 text-caption font-medium">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={
            locale === activeLocale
              ? 'text-pure-white'
              : 'text-lichen-sage transition-colors hover:text-pure-white'
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/nav/FloatingNav.tsx`**

```tsx
import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import LanguageSwitcher from './LanguageSwitcher';

export default async function FloatingNav() {
  const t = await getTranslations('nav');

  const links = [
    {href: '#tentang', label: t('about')},
    {href: '#layanan', label: t('services')},
    {href: '#project', label: t('projects')},
    {href: '#testimoni', label: t('testimonials')},
    {href: '#kontak', label: t('contact')}
  ];

  return (
    <header className="sticky top-24 z-50 mx-auto flex w-[calc(100%-48px)] max-w-[1200px] items-center justify-between gap-16 rounded-nav bg-onyx-olive/90 px-24 py-12 backdrop-blur">
      <Link href="#" className="font-aeonik text-body-md font-semibold text-pure-white">
        Gradasi Alam
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-buttons px-12 py-8 text-body font-medium text-lichen-sage transition-colors hover:text-pure-white"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-16">
        <LanguageSwitcher />
        <a
          href="https://wa.me/6281222991625"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-pill bg-electric-sprout px-20 py-8 text-body font-medium text-onyx-olive transition-colors hover:bg-deep-verdant"
        >
          {t('cta')}
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create `src/components/layout/Footer.tsx`**

```tsx
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
```

- [ ] **Step 4: Create `src/app/[locale]/layout.tsx`**

```tsx
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
```

- [ ] **Step 5: Verify locale routing now renders**

Run: `npm run dev`, open `http://localhost:3000/`.
Expected: redirects to `/id`, renders a dark page with the floating nav bar and footer, and a 404 in between (no `page.tsx` yet — fixed in Task 6). Switching the URL to `/en` shows English nav labels and footer text. Stop the dev server after checking.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add locale layout, floating nav, and footer"
```

---

### Task 6: Homepage skeleton and Hero section

**Files:**
- Create: `src/app/[locale]/page.tsx`
- Create: `src/components/home/Hero.tsx`

**Interfaces:**
- Consumes: `getContent` from `@/content`, `SiteContent` type from `@/content/types`, `hero` message namespace.
- Produces: `HomePage` default export rendering `<Hero hero={content.hero} />`; later tasks (7-10) add their section components as additional children of the same `<main>`.

- [ ] **Step 1: Create `src/components/home/Hero.tsx`**

```tsx
import {getTranslations} from 'next-intl/server';
import type {SiteContent} from '@/content/types';

export default async function Hero({hero}: {hero: SiteContent['hero']}) {
  const t = await getTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-forest-depths px-24 pt-128 pb-80 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_var(--color-moss-shadow)_0%,_transparent_70%)] opacity-40"
      />
      <div className="relative mx-auto flex max-w-[800px] flex-col items-center gap-24">
        <span className="rounded-badges border border-lichen-sage px-16 py-4 text-body text-pure-white">
          {hero.badge}
        </span>
        <h1 className="font-ozik text-display-xl text-pure-white md:text-display-2xl">
          {hero.headline} <span className="text-electric-sprout">{hero.headlineAccent}</span>
        </h1>
        <p className="max-w-[640px] text-subheading text-pale-fern">{hero.subhead}</p>
        <div className="flex flex-wrap items-center justify-center gap-16">
          <a
            href="https://wa.me/6281222991625"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-electric-sprout px-20 py-8 text-body-md font-medium text-onyx-olive transition-colors hover:bg-deep-verdant"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#project"
            className="rounded-pill border border-pure-white px-20 py-8 text-body-md font-medium text-pure-white transition-colors hover:bg-pure-white/10"
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/app/[locale]/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify the hero renders**

Run: `npm run dev`, open `http://localhost:3000/id`.
Expected: dark hero section with badge, Boldonse display headline with a green accent word, subhead, and two CTA buttons, nav and footer around it. Check `/en` shows the English hero copy. Stop the dev server after checking.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add homepage skeleton and hero section"
```

---

### Task 7: About and Services sections

**Files:**
- Create: `src/components/home/About.tsx`
- Create: `src/components/home/Services.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SiteContent['about']`, `SiteContent['services']`, `services` message namespace.
- Produces: `<About about={...} />` and `<Services services={...} />`, added to `page.tsx` after `<Hero />`.

- [ ] **Step 1: Create `src/components/home/About.tsx`**

```tsx
import type {SiteContent} from '@/content/types';

export default function About({about}: {about: SiteContent['about']}) {
  return (
    <section id="tentang" className="bg-pure-white px-24 py-80 text-onyx-olive">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-24 text-center">
        <span className="rounded-badges bg-sprout-wash px-12 py-4 text-caption font-medium text-moss-shadow">
          {about.eyebrow}
        </span>
        <h2 className="max-w-[640px] font-aeonik text-heading-lg font-semibold">{about.heading}</h2>
        <p className="max-w-[640px] text-body-md text-onyx-olive/80">{about.body}</p>
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
```

- [ ] **Step 2: Create `src/components/home/Services.tsx`**

```tsx
import {getTranslations} from 'next-intl/server';
import type {SiteContent} from '@/content/types';

export default async function Services({services}: {services: SiteContent['services']}) {
  const t = await getTranslations('services');

  return (
    <section id="layanan" className="bg-bone-white px-24 py-80">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-40 text-center font-aeonik text-heading-lg font-semibold text-onyx-olive">
          {t('heading')}
        </h2>
        <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.id} className="rounded-cards border border-onyx-olive/10 bg-pure-white px-24 py-32">
              <h3 className="mb-8 text-heading-sm font-semibold text-onyx-olive">{service.title}</h3>
              <p className="text-body text-onyx-olive/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update `src/app/[locale]/page.tsx`**

```tsx
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
```

- [ ] **Step 4: Verify both sections render**

Run: `npm run dev`, open `http://localhost:3000/id`.
Expected: below the hero, a light About band with eyebrow/heading/body/stats, then a Bone White Services grid with 4 cards. Stop the dev server after checking.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add about and services sections"
```

---

### Task 8: Projects/Portfolio section with placeholder images

**Files:**
- Create: `src/components/home/Projects.tsx`
- Create: `public/images/projects/residential-1.svg`
- Create: `public/images/projects/residential-2.svg`
- Create: `public/images/projects/corporate-1.svg`
- Create: `public/images/projects/corporate-2.svg`
- Create: `public/images/projects/indoor-1.svg`
- Create: `public/images/projects/maintenance-1.svg`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SiteContent['projects']`, `ProjectCategory` type, `projects` message namespace (`heading`, `filterAll`, `filterResidential`, `filterCorporate`, `filterIndoor`, `filterMaintenance`).
- Produces: `<Projects projects={...} />`, added to `page.tsx` after `<Services />`.

- [ ] **Step 1: Create the six placeholder SVGs**

`public/images/projects/residential-1.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#122314"/>
      <stop offset="100%" stop-color="#273f2b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#b7bda5" font-family="sans-serif" font-size="28">Residential — Placeholder</text>
</svg>
```

`public/images/projects/residential-2.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#122314"/>
      <stop offset="100%" stop-color="#273f2b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#b7bda5" font-family="sans-serif" font-size="28">Residential — Placeholder</text>
</svg>
```

`public/images/projects/corporate-1.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#122314"/>
      <stop offset="100%" stop-color="#26a200"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#e7f9dd" font-family="sans-serif" font-size="28">Corporate — Placeholder</text>
</svg>
```

`public/images/projects/corporate-2.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#122314"/>
      <stop offset="100%" stop-color="#26a200"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#e7f9dd" font-family="sans-serif" font-size="28">Corporate — Placeholder</text>
</svg>
```

`public/images/projects/indoor-1.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#30322a"/>
      <stop offset="100%" stop-color="#68ef3f"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#122314" font-family="sans-serif" font-size="28">Indoor — Placeholder</text>
</svg>
```

`public/images/projects/maintenance-1.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#122314"/>
      <stop offset="100%" stop-color="#7e8371"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#f2f5eb" font-family="sans-serif" font-size="28">Maintenance — Placeholder</text>
</svg>
```

- [ ] **Step 2: Create `src/components/home/Projects.tsx`**

```tsx
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
```

- [ ] **Step 3: Update `src/app/[locale]/page.tsx`**

```tsx
import {getContent} from '@/content';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Projects from '@/components/home/Projects';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const content = getContent(locale);

  return (
    <main>
      <Hero hero={content.hero} />
      <About about={content.about} />
      <Services services={content.services} />
      <Projects projects={content.projects} />
    </main>
  );
}
```

- [ ] **Step 4: Verify the filter works**

Run: `npm run dev`, open `http://localhost:3000/id#project`.
Expected: a dark Projects band with 6 placeholder cards and 5 filter buttons; clicking "Corporate" shows only the 2 corporate placeholders, clicking "Semua"/"All" shows all 6 again.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add projects section with placeholder images"
```

---

### Task 9: Testimonials and News teaser sections

**Files:**
- Create: `src/components/home/Testimonials.tsx`
- Create: `src/components/home/NewsTeaser.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SiteContent['testimonials']`, `SiteContent['news']`, `testimonials` and `news` message namespaces.
- Produces: `<Testimonials testimonials={...} />` and `<NewsTeaser news={...} />`, added to `page.tsx` after `<Projects />`.

- [ ] **Step 1: Create `src/components/home/Testimonials.tsx`**

```tsx
import {getTranslations} from 'next-intl/server';
import type {TestimonialItem} from '@/content/types';

export default async function Testimonials({testimonials}: {testimonials: TestimonialItem[]}) {
  const t = await getTranslations('testimonials');

  return (
    <section id="testimoni" className="bg-pure-white px-24 py-80">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-40 text-center font-aeonik text-heading-lg font-semibold text-onyx-olive">
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
```

- [ ] **Step 2: Create `src/components/home/NewsTeaser.tsx`**

```tsx
import {getTranslations} from 'next-intl/server';
import type {NewsItem} from '@/content/types';

export default async function NewsTeaser({news}: {news: NewsItem[]}) {
  const t = await getTranslations('news');

  return (
    <section className="bg-bone-white px-24 py-80">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-40 flex items-center justify-between">
          <h2 className="font-aeonik text-heading-lg font-semibold text-onyx-olive">{t('heading')}</h2>
          <span className="rounded-badges bg-sprout-wash px-12 py-4 text-caption font-medium text-moss-shadow">
            {t('comingSoon')}
          </span>
        </div>
        <div className="grid gap-24 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.id} className="rounded-cards border border-onyx-olive/10 bg-pure-white px-24 py-32">
              <h3 className="mb-8 text-heading-sm font-semibold text-onyx-olive">{item.title}</h3>
              <p className="text-body text-onyx-olive/70">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update `src/app/[locale]/page.tsx`**

```tsx
import {getContent} from '@/content';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Projects from '@/components/home/Projects';
import Testimonials from '@/components/home/Testimonials';
import NewsTeaser from '@/components/home/NewsTeaser';

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
    </main>
  );
}
```

- [ ] **Step 4: Verify both sections render**

Run: `npm run dev`, open `http://localhost:3000/id`.
Expected: a light Testimonials band with 3 quote cards, then a Bone White News band with 3 article cards and a "Segera hadir" badge.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add testimonials and news teaser sections"
```

---

### Task 10: Contact section

**Files:**
- Create: `src/components/home/Contact.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SiteContent['contact']`, `contact` message namespace (`heading`, `headingAccent`, `ctaPrimary`).
- Produces: `<Contact contact={...} />`, added to `page.tsx` as the final section.

- [ ] **Step 1: Create `src/components/home/Contact.tsx`**

```tsx
import {getTranslations} from 'next-intl/server';
import type {SiteContent} from '@/content/types';

export default async function Contact({contact}: {contact: SiteContent['contact']}) {
  const t = await getTranslations('contact');

  return (
    <section id="kontak" className="bg-forest-depths px-24 py-80 text-center text-pure-white">
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-24">
        <h2 className="font-ozik text-display">
          {t('heading')} <span className="text-electric-sprout">{t('headingAccent')}</span>
        </h2>
        <p className="text-body-md text-pale-fern">{contact.address}</p>
        <div className="flex flex-wrap items-center justify-center gap-16">
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-electric-sprout px-20 py-8 text-body-md font-medium text-onyx-olive transition-colors hover:bg-deep-verdant"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="rounded-pill border border-pure-white px-20 py-8 text-body-md font-medium text-pure-white transition-colors hover:bg-pure-white/10"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `src/app/[locale]/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify the section renders**

Run: `npm run dev`, open `http://localhost:3000/id#kontak`.
Expected: a dark Contact band bookending the hero, with headline "Mari Wujudkan" (green accent on "Wujudkan"), address, WhatsApp CTA, and email link.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add contact section"
```

---

### Task 11: Full-page verification pass

**Files:** none (verification only).

**Interfaces:** none — this task exercises everything built in Tasks 1-10.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: succeeds with no TypeScript or lint errors, both `/id` and `/en` statically generated (visible in the build output route list).

- [ ] **Step 2: Responsive check**

Run: `npm run dev`, open `http://localhost:3000/id` in a browser and resize (or use device toolbar) at ~375px (mobile), ~768px (tablet), and ~1280px+ (desktop).
Expected: nav collapses its link row below `md` (768px) but keeps wordmark, language switcher, and CTA visible; all nine sections stay readable with no horizontal scrollbar at any width; Services/Projects/Testimonials/News grids collapse to 1-2 columns on mobile.

- [ ] **Step 3: Language switch check**

From `/id`, click "EN" in the nav. Confirm the URL becomes `/en` and every section's text (nav, hero, about, services, project filters, testimonials, news, contact, footer) switches to English. Click "ID" to switch back.

- [ ] **Step 4: Link check**

Confirm: the nav CTA and hero primary CTA open `https://wa.me/6281222991625` in a new tab; hero secondary CTA and nav anchor links scroll to the matching section; the Contact section's email link opens a `mailto:` composer; footer email/WhatsApp links work the same way.

- [ ] **Step 5: Visual spot-check against design.md**

Confirm: dark/light bands alternate (Hero dark → About light → Services bone → Projects dark → Testimonials light → News bone → Contact dark), the hero headline uses the Boldonse display font at the intended near-1.0 line height, body text uses Geist, and the one Instrument Serif appearance is the testimonial quotes.

- [ ] **Step 6: Final commit**

If any fixes were needed during verification, commit them now:

```bash
git add -A
git commit -m "fix: address issues found in full-page verification pass"
```

If no fixes were needed, this task requires no commit.
