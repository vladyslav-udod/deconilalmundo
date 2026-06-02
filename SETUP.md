# De Conil al Mundo — setup

Next.js 15 (App Router) + Sanity v3 site.

## Run

```bash
npm install
cp .env.local.example .env.local   # fill in your Sanity project id
npm run dev                        # site at http://localhost:3000
npm run sanity                     # Studio at http://localhost:3333 (or /studio)
```

The site works with built-in fallback data even before Sanity is configured.

## Troubleshooting

### `Error: Cannot find module '@rollup/rollup-darwin-arm64'` when running Sanity

This is a known npm bug with optional native dependencies
([npm/cli#4828](https://github.com/npm/cli/issues/4828)): a `package-lock.json`
generated on one OS can omit the native Rollup binary for another OS.

It's already mitigated — the Rollup platform binaries are declared under
`optionalDependencies` in `package.json`. If you still hit it (e.g. after
copying `node_modules` between machines), do a clean install:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Instagram feed

The "Síguenos en Instagram" section fetches the latest 6 public posts from
`@deconilalmundo` server-side (`lib/instagram.ts`, cached 1h). Instagram blocks
many datacenter IPs; when the request fails the section falls back to a curated
travel grid automatically. No token required, but a long-lived Graph API token
can be wired in later for guaranteed delivery.

## Cookie banner (for Google Analytics later)

The consent banner is **off by default** because the site only uses technical
cookies. When you add Google Analytics:

1. Set the flag in `lib/config.ts` (`SHOW_COOKIE_BANNER = true`) or the env var
   `NEXT_PUBLIC_SHOW_COOKIE_BANNER=true`.
2. Initialise GA inside `components/CookieBanner.tsx` where the comment marks
   the "accepted" branch, so analytics only load after consent.

## SEO

- `app/robots.ts` → `/robots.txt` (allows AI crawlers, blocks `/studio`).
- `app/sitemap.ts` → `/sitemap.xml` (home, legal pages, every tour).
- `app/manifest.ts` → `/manifest.webmanifest`.
- Schema.org JSON-LD: `TravelAgency` (site-wide, in `app/layout.tsx`) and
  `TouristTrip` + `Offer` per tour page.
- Set `NEXT_PUBLIC_SITE_URL` in `.env.local` so canonical URLs, the sitemap and
  robots point at the production domain.

## Filters & deep links

"Próximas salidas" filters (region, type, month) are stored in the URL
(`/?region=asia&tipo=mujeres&mes=2026-08#tours`), so links are shareable. The
six "Seis formas de vivirlo" cards' **Explorar** buttons deep-link into the
section pre-filtered by type. The travel-type and month options come from a
single source of truth, `lib/taxonomy.ts`, which the Sanity tour schema also
uses for its dropdowns.
