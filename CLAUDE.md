# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:4321
npm run build    # production build (runs @playform/compress)
npm run preview  # preview the production build
```

No test runner or linter is configured.

## Architecture

Astro 6 static site (`output: "static"`) for Łukasz Miłoś — a Polish freelancer's personal site. Pages are in Polish.

### Layout hierarchy

```
BaseLayout        — <html>, fonts, SEO, theme-change script, scroll animations
  └─ PageLayout   — Navbar, Banner, Footer wrapper; optional page heading
       └─ blog/EntryLayout, portfolio/EntryLayout, ArchiveLayout, etc.
```

`BaseLayout` receives a `meta` prop (title, description, canonical, noindex/nofollow) and optional `schema`. OG images are auto-generated per page via `astro-opengraph-images` with a custom React template at [src/components/core/custom-og-template.tsx](src/components/core/custom-og-template.tsx).

### Content collections (`src/content.config.ts`)

| Collection | Source | Schema |
|---|---|---|
| `blog` | `src/content/blog/*.{md,mdx}` | `blogSchema` |
| `portfolio` | `src/content/portfolio/*.{md,mdx}` | `portfolioSchema` |
| `reviews` | `src/content/reviews/*.{md,mdx}` | `reviewSchema` |
| `pricing` | `src/content/pricing/pricing.json` | `pricingSchema` |

Files prefixed with `_` are excluded from all collections (glob pattern `[^_]*`). Pages starting with `_` (e.g. `_cennik.astro`, `_stylebook.astro`) are hidden draft pages, excluded from the sitemap.

### Path aliases (tsconfig.json)

```
~/*           → src/*
@components/* → src/components/*
@layouts/*    → src/layouts/*
@utils/*      → src/utils/*
@data/*       → src/data/*
@content/*    → src/content/*
@assets/*     → src/assets/*
@pages/*      → src/pages/*
```

### Styling

Tailwind CSS v4 (via `@tailwindcss/vite`) + DaisyUI v5. Two themes: `light` and `dark`, toggled via `theme-change` and stored in `localStorage`. DaisyUI semantic color tokens (`base-content`, `primary`, `neutral`, etc.) are used throughout — avoid hardcoded colors.

### Key component conventions

- **`Section`** — the main layout primitive wrapping page sections. Props: `variant` (`default`/`secondary`/`tetriary`), `padding` (`none`/`sm`/`md`/`lg`), `containerSize` (Tailwind max-w class, default `max-w-4xl`).
- **`Button`** — renders an `<a>` tag. Default class is `btn-primary`. Pass `class="btn-outline"` or similar DaisyUI variants. Use `class="btn-neutral"` (not `btn-dark`) on dark/neutral backgrounds.
- **`Heading`** — accepts `tag` (h1–h6) and `look` (h0–h6) props to decouple visual size from semantic tag.
- **`Container`** — thin wrapper applying `size` as a `max-w-*` class with horizontal padding.
- Icons come from `astro-icon` with the Tabler icon set (`tabler:icon-name`).

### Site config

All global constants (company info, socials, site domain, themes, pagination sizes) live in [src/data/consts.json](src/data/consts.json). Settings for other features live in [src/data/settings.json](src/data/settings.json).

### URL structure

- `/` — home
- `/strony-www/` — websites service page
- `/systemy-i-automatyzacje/` — systems & automation service page
- `/portfolio/` — portfolio archive; `/portfolio/[id]/` — single entry
- `/blog/` — blog archive; `/blog/[id]/` — single post
- `/kontakt/` — contact

Redirects from old URLs are defined in `astro.config.mjs`.
