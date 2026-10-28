# Game Sector — gamers marketplace

Marketplace for game accounts, boosting, top ups, items and hourly services across 1,700+ games. Every order is covered by Game Sector Buyer Protection; sellers list for free with 0% commission.

## Stack

- Next.js 15 (App Router, TypeScript) on Vercel
- Tailwind CSS v4 (`app/globals.css` holds the theme and the `btn-gradient` / `card-panel` / `chip` / `section-label` utilities)
- Geist / Geist Mono via `next/font`, lucide-react icons, sonner toasts

## Structure

- `lib/brand.ts` — brand name, platform stats, formatters
- `lib/games.ts` — game catalog, categories, counts, servers, popular searches
- `lib/listings.ts` — sellers, deterministic listing generator, reviews
- `lib/news.ts`, `lib/faq.ts` — editorial and FAQ content
- `app/(marketing)` — all routes: `/`, `/market`, `/market/[game]`, `/market/[game]/[category]`, `/market/[game]/[category]/[id]`, `/seller`, `/seller/[handle]`, `/affiliate`, `/about`, `/faq`, `/support`, `/news`, `/news/[slug]`, `/coins-merchants`, `/terms-of-service`, `/privacy-policy`, plus `/login`, `/signup`, `/orders`, `/notifications`, `/chat`, `/account`

Authentication, payments and the database are intentionally not wired yet; account pages render a sign-in gate.

## Development

```
npm install
npm run dev
```

`npm run build` must pass before pushing to `main`; Vercel deploys `main` to production automatically.
