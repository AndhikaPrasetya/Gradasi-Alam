# Gradasi Alam — Homepage Revamp Design

**Date:** 2026-08-09
**Status:** Approved for planning
**Scope:** Phase 1 — new Next.js homepage (single page) + shared nav/footer layout, applying the "Tomorro" style reference from `design.md`. Other pages (dedicated Projects, News/Blog, Testimonials pages) are out of scope for this phase.

## Background

Gradasi Alam (gradasialam.com) is an exterior design / landscaping company based in Bogor, Indonesia, operating since 2018 with 655+ completed projects across 17 Indonesian cities. The current site has: About Us, Services, Projects (filterable by category), News/blog, Testimonials, and Contact.

The project owner supplied `design.md`, a design-token/style reference (brand name "Tomorro" in the source, dark-forest + neon-green botanical aesthetic) to be adapted as the new visual language. The botanical/green aesthetic is a good fit for a landscaping brand even though the reference was authored for a SaaS product — see "Adaptations from design.md" below for where we deviate.

## Goals

- Rebuild the homepage in Next.js using the design.md visual system (colors, type, spacing, components).
- Bilingual from the start: Indonesian (default) and English, with SEO-friendly locale-prefixed routes.
- Reuse existing site's content/structure (About, Services, Projects, Testimonials, News, Contact) rather than inventing new copy.
- No backend/CMS/forms in this phase — fully static, WhatsApp link for contact.
- Leave the codebase in a state where later phases (dedicated sub-pages, real photos, CMS) are additive, not a rewrite.

## Non-goals (this phase)

- Dedicated routes for /projects, /news/[slug], /testimonials — homepage shows previews only, linking out to "coming soon" or anchor sections.
- Real project photography — placeholders only, swapped in later.
- Contact form, email sending, or any server-side logic.
- Automated test suite.

## Architecture & Tech Stack

- **Next.js 15, App Router, TypeScript.**
- **Tailwind v4**, theme tokens copied from `design.md`'s Quick Start `@theme` block into `globals.css` (colors, type scale, spacing, radii already match Tailwind v4 syntax).
- **next-intl** for i18n: locale-prefixed routes `/id/...` and `/en/...`, `id` as default/fallback locale, middleware-based locale detection.
- **Fonts** via `next/font/google` (free substitutes suggested by design.md itself):
  | design.md face | Substitute used | Usage |
  |---|---|---|
  | Ozik | **Boldonse** | Hero/section display headlines only, 56-80px |
  | Aeonik | **Geist** | All UI chrome — nav, body, buttons, cards, headings ≤40px |
  | Instrument Serif | **Instrument Serif** (exact match on Google Fonts) | Badges, small accent sub-headings only |
- No database, no CMS, no API routes. All content is static and statically generated (SSG).
- Not tied to a specific deploy platform — no Vercel-specific config.

## Routing & Project Structure

```
src/
  app/
    [locale]/
      layout.tsx        # nav + footer shell, font/theme providers
      page.tsx           # homepage — composes section components
  components/
    nav/FloatingNav.tsx
    home/Hero.tsx
    home/About.tsx
    home/Services.tsx
    home/Projects.tsx
    home/Testimonials.tsx
    home/NewsTeaser.tsx
    home/Contact.tsx
    layout/Footer.tsx
    ui/                  # Button, Badge, Pill, Card primitives per design.md components
  content/
    id.ts                # structured content: services, projects, testimonials, news (ID)
    en.ts                # same shape, English
    types.ts             # shared TS interfaces for the above
messages/
  id.json                 # next-intl UI strings (nav labels, buttons, section titles)
  en.json
public/
  images/projects/        # placeholder images, descriptively named per category
```

- `middleware.ts` at root handles locale routing/redirect (`/` → `/id`).
- Anchor links (`#tentang`, `#layanan`, `#project`, `#testimoni`, `#kontak`) scroll within the single homepage; nav is shared and ready to link to future dedicated routes without restructuring.

## Homepage Sections

In order, dark/light bands alternating per design.md's rhythm:

1. **Floating Pill Nav** (sticky, 24-32px top margin) — "Gradasi Alam" wordmark, anchor links (Tentang, Layanan, Project, Testimoni, Kontak), EN/ID language switcher, primary CTA pill → `wa.me` link. Reuses `Nav Dropdown Trigger` / `Primary CTA — Filled Sprout` components from design.md.
2. **Hero** (dark, Forest Depths `#122314`) — decorative sprout orb behind copy, stat badge ("655+ project · 17 kota" or similar, using Event Announcement Pill styling), Boldonse display headline with one Electric Sprout accent word, Geist subhead paragraph, dual CTA (primary "Hubungi via WhatsApp" → wa.me link; secondary ghost "Lihat Project" → anchor scroll).
3. **About Us** (light, Pure White) — headline + body copy adapted from current site's "partnership from concept to completion" framing; optional stat row (2018, 655+, 17 kota) as small badges.
4. **Services** — 4 cards (Exterior Design, Complete Construction, Intensive Maintenance, Planting & Renting), each with a short description reused from the current site's service copy. Card styling per design.md's card radius (16-24px) and hairline border rules.
5. **Projects/Portfolio** — category tabs (Residential, Corporate, Indoor, Maintenance) with simple client-side filter (no routing); grid of placeholder image cards, clean rounded corners, no tilt (deviation from design.md's tilted-mockup treatment — see Adaptations).
6. **Testimonials** — client/influencer quote cards, light band, grid or simple carousel.
7. **News teaser** — 2-3 static article preview cards with placeholder excerpt text; no working blog routes yet, card links can be disabled or point to `#` with a "segera hadir" note.
8. **Contact** (dark, bookends the hero) — WhatsApp CTA, address (Jl. Akasia Raya No. 24, Bogor), email, social icons (Facebook, Pinterest, TikTok, Instagram, LinkedIn) linking to Gradasi Alam's real profiles.
9. **Footer** — wordmark, anchor links repeated, contact info, copyright, language switcher.

## Content & Data

- UI chrome strings (nav labels, button text, section eyebrows) live in `messages/{locale}.json`, consumed via `next-intl`'s `useTranslations`.
- Structured content (service list, project list, testimonial list, news list) lives in typed data files `src/content/{id,en}.ts` sharing interfaces from `src/content/types.ts`. Components import this data directly — no fetching, no CMS.
- Copy is adapted from the current gradasialam.com content (About framing, 4 service categories, project categories, testimonial quotes) rather than invented fresh.

## Images

- Placeholder images for hero atmosphere (decorative orb — can be a CSS gradient + noise, no image file needed) and for the Projects grid.
- Project placeholders live at `public/images/projects/<category>-<n>.jpg` (e.g. `residential-1.jpg`) with consistent aspect ratio, tone-matched to the palette (dark green/neutral) so the page doesn't look broken pre-swap. Swapping in real photos later is a file replacement, no code change.
- `next/image` used throughout for optimization; fixed aspect-ratio containers sized per design.md's card dimensions.

## Adaptations from design.md

design.md was authored for a SaaS product and explicitly avoids photography ("no lifestyle photography, no stock imagery, no portraits"). Gradasi Alam is a landscaping business where real project photos are the core trust signal, so:

- **Keep:** color tokens, type system (Boldonse/Geist/Instrument Serif), spacing scale, border radii, pill nav, button/badge/card component shapes, dark/light section alternation, decorative sprout orb in the hero only.
- **Deviate:** Projects section uses clean, scannable photo cards (not tilted SaaS-mockup-style cards) so real project photography reads clearly; the "no photography" rule is dropped for the portfolio section specifically.

## Error Handling

Minimal, since there's no backend or forms:
- `next/image` placeholder/blur handling for missing images.
- Default Next.js 404 for unmatched routes.
- No other error states needed in this phase.

## Verification Plan

No automated test suite (YAGNI for a static marketing homepage). Manual verification before considering the phase done:
- `npm run build` completes with no type errors.
- Dev server manual check across mobile / tablet / desktop breakpoints.
- Language switcher toggles all visible text between ID and EN correctly, URL reflects `/id` and `/en`.
- All links resolve: WhatsApp CTA opens correct `wa.me` link, anchor links scroll to the right section, social icons point to real profiles.
- Visual spot-check against design.md tokens (colors, headline line-height/letter-spacing, section alternation, radii).

## Open Items for Later Phases

- Dedicated `/projects`, `/news/[slug]`, `/testimonials` routes.
- Real project photography to replace placeholders.
- Possible CMS (e.g. for News/blog) if content update frequency justifies it.
- Contact form / email backend, if WhatsApp-only proves insufficient.
