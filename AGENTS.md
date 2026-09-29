# Repository Guidelines

## Project Structure & Module Organization

This is a static Astro site. Routes live in `src/pages/`; industry offers use directories such as `src/pages/oferta/cnc/index.astro`, with related pages beside the index. Reusable UI belongs in `src/components/`, shared page wrappers in `src/layouts/`, and helpers in `src/utils/`. Blog and portfolio entries live in `src/content/`; site settings and industry navigation data live in `src/data/`. Put processed images, icons, fonts, and global CSS in `src/assets/`; reserve `public/` for files served unchanged. Generated output in `dist/` is not source code.

## Development Commands

- `npm ci` installs the versions recorded in `package-lock.json`.
- `npm run dev` starts the local Astro server for editing and browser checks.
- `npm run build` generates the static site in `dist/` for release verification.
- `npm run preview` serves an existing build locally.

Run a build when release verification is needed; routine copy or CSS edits can be checked with the development server.

## Coding Style & Naming

Follow the existing two-space indentation in Astro, TypeScript, and CSS. Keep route names lowercase and hyphenated, for example `systemy-i-automatyzacje.astro`; use PascalCase for reusable components such as `IndustryOpenProblem.astro`. Prefer the configured `@components/`, `@layouts/`, `@assets/`, and `@data/` aliases over long relative imports. Use Tailwind utilities for local layout and `src/assets/styles/global.css` for shared design rules. No formatter or linter command is configured, so match the surrounding file and review diffs for whitespace changes.

## Testing & Review

There is currently no automated test suite or coverage target. Check affected routes in the browser at phone, tablet, and desktop widths, in both light and dark themes. Exercise relevant navigation, forms, and calculators; check text contrast and horizontal overflow. For broader changes, verify the generated site with `npm run build` when the task permits it.

## Commits & Pull Requests

Git history uses short, informal English summaries rather than a formal commit convention. Write a specific imperative subject, such as `Improve mobile offer cards`, instead of `fixed` or `update`. Pull requests should explain the change, list checked routes and commands, link an issue when applicable, and include before/after screenshots for visible UI changes.

## Configuration & Secrets

Copy `.env.example` to a local `.env` and supply `PUBLIC_WEB3FORMS_KEY` for the contact form. Never commit `.env` or private credentials. Variables prefixed `PUBLIC_` are exposed to the browser.
