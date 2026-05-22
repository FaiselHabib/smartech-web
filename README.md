# Smartech Group — Website

موقع شركة **سمارتك جروب** (Smartech Group) — Next.js 15 App Router · TypeScript · Tailwind · Framer Motion · RTL Arabic-first · SEO-ready · Vercel-ready.

> Positioning: *Smartech Group is a Saudi company that builds digital systems and creates visual content* — under two divisions:
> - **Smartech Systems** (software, apps, dashboards, AI, support)
> - **Smartech Media** (drone, video, real-estate, reels, AI editing)

---

## Quick start

```bash
# 1. Install
npm install

# 2. Run dev server
npm run dev          # → http://localhost:3000

# 3. Build for production
npm run build && npm start
```

Deployment: this project is configured for **Vercel** — connect the repo and deploy. No env vars required out of the box.

---

## Project structure

```
src/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout — RTL, IBM Plex Arabic, Org schema
│   ├── page.tsx               # Home (/)
│   ├── globals.css
│   ├── opengraph-image.tsx    # Dynamic 1200x630 OG image
│   ├── sitemap.ts             # /sitemap.xml
│   ├── robots.ts              # /robots.txt
│   ├── not-found.tsx          # 404
│   ├── systems/page.tsx       # /systems
│   ├── media/page.tsx         # /media
│   ├── portfolio/page.tsx     # /portfolio
│   ├── services/page.tsx      # /services
│   ├── about/page.tsx         # /about
│   ├── blog/page.tsx          # /blog
│   ├── blog/[slug]/page.tsx   # /blog/:slug
│   └── contact/page.tsx       # /contact
│
├── components/
│   ├── brand/Logo.tsx
│   ├── layout/                # Navbar, Footer, WhatsAppFAB
│   ├── sections/              # Hero, DivisionCards, TrustStats, ServiceGrid …
│   └── ui/                    # Button, Card, Badge, Section primitives
│
├── content/                   # Editable data
│   ├── services.ts            # Systems + Media services
│   ├── projects.ts            # Portfolio case studies
│   └── blog.ts                # Blog posts
│
└── lib/
    ├── site.ts                # Site metadata, nav, contact
    ├── seo.ts                 # buildMetadata + JSON-LD schemas
    └── utils.ts               # cn + Arabic number helpers
```

---

## Editing content

All content lives in `src/content/`:

| File | What it controls |
| --- | --- |
| `services.ts` | The Systems & Media service grids (everywhere) |
| `projects.ts` | Portfolio cards + case-study blocks (Home, Portfolio, Systems, Media) |
| `blog.ts` | Blog index and `/blog/[slug]` pages |

`src/lib/site.ts` — change company name, phone, email, WhatsApp link, social handles.

---

## Brand assets

Drop the originals from the `Identity/` folder into `public/brand/`:

| Destination | Source from `Identity/` |
| --- | --- |
| `public/brand/smartech-icon.svg` | Icon-only mark (e.g. `IMG_3729.PNG` → SVG) |
| `public/brand/smartech-logo.svg` | Dark wordmark (`IMG_3730.PNG`) |
| `public/brand/smartech-logo-light.svg` | Light/white wordmark (`IMG_3732.PNG`) |
| `public/favicon.ico` + `apple-touch-icon.png` | Generated from icon |

A clean inline SVG is currently used as fallback inside `src/components/brand/Logo.tsx` — if you want to use the raster logos, swap the `<BrainIcon />` for a `next/image` call.

Portfolio covers → `public/portfolio/*` (see folder README)
Blog covers → `public/blog/*` (see folder README)

---

## Brand tokens (Tailwind)

| Token | Value |
| --- | --- |
| `brand.mint` | `#39D2C0` |
| `brand.mintLight` | `#7FE3D6` |
| `brand.mintSoft` | `#E6FAF7` |
| `brand.teal` | `#073B4A` |
| `brand.tealMid` | `#064456` |
| `brand.tealDeep` | `#04222B` |
| `bg-brand-gradient` | mint → deep-teal diagonal |
| `bg-hero-radial` | hero glow |
| `grid-bg` | subtle teal grid |
| `shadow-brand` / `shadow-glass` | brand-tinted shadows |

Typography: **IBM Plex Sans Arabic** loaded via `next/font/google` (RTL-safe, looks great with the Smartech wordmark).

---

## SEO

- Per-page `metadata` via `buildMetadata()` in `src/lib/seo.ts`
- JSON-LD: **Organization**, **LocalBusiness** (root layout), **Service** (Systems / Media), **Article** (`/blog/[slug]`)
- Open Graph image generated dynamically at `/opengraph-image`
- `/sitemap.xml` + `/robots.txt` generated automatically
- Arabic-first keywords baked into `site.ts` defaults
- Clean URLs: `/`, `/systems`, `/media`, `/portfolio`, `/services`, `/about`, `/blog`, `/contact`

---

## Conversion

Every page funnels visitors to one of:

1. **WhatsApp** floating bubble (always visible, bottom-left for RTL)
2. **Request quote** CTA → `/contact` form (opens WhatsApp with pre-filled body)
3. **Call** → `tel:` link

---

## Adding English later

The whole site is already structured for i18n:

- HTML uses `lang="ar"` `dir="rtl"` in `app/layout.tsx`
- All text lives inline (easy to extract) — recommend moving to `src/content/i18n/{ar,en}.ts` and wrapping pages with a locale segment (`app/[locale]/...`) when you're ready

---

## Notes for production

- Set `site.url` in `src/lib/site.ts` to the deployed domain (currently `https://smartech-group.com`)
- Add a real `favicon.ico` + `apple-touch-icon.png` in `public/`
- Replace gradient placeholders with real portfolio/blog covers
- Hook up the contact form to your backend / email if you want server-side storage (current behavior: opens WhatsApp with a pre-filled message — zero infra needed)

---

Built with 💚 by Smartech Group.
