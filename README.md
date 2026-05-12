# WEBLOFT

Production website directory built with Next.js App Router, Supabase, and Razorpay.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Supabase (auth + database)
- Razorpay (billing)

## Source Of Truth

- Runtime app: `app/`, `components/`, `lib/`, `hooks/`
- `src/` currently exists for legacy/reference code paths. Do not add new runtime features there.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure env:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
npm run dev
```

## Required Environment Variables

See `.env.example` for full list.

Minimum required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_SITE_URL` (set to canonical production URL, e.g. `https://www.webloft.in`)

Billing:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

Ads:

- `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT`

## Database

Run Supabase migrations in order from `supabase/migrations/`.

Core schema includes:

- `categories`, `subcategories`, `websites`
- `profiles`, `user_favourites`, `user_events`
- `website_trending`, `subscriptions`
- `admin_audit_logs`

## Security Notes

- `app/api/billing/upgrade` is disabled by default.
- Enable only if strictly needed:
  - `ALLOW_MANUAL_UPGRADE=true`
  - admin user or trusted `x-manual-upgrade-secret` + `MANUAL_UPGRADE_SECRET`
- Rate limiting is enabled for admin and billing-sensitive APIs.
- Optional distributed rate limiting can be enabled via Upstash Redis REST env vars.

## Tests

Run:

```bash
npm test
```

## SEO & Verification

- Canonical site URL is derived from `NEXT_PUBLIC_SITE_URL`.
- Legacy URL redirect configured: `/home.html -> /`
- Domain redirect configured: `webloft.in -> www.webloft.in`
- `ads.txt` file is served from `public/ads.txt`
- Google site verification file is served from `public/google7bb223fcbff3fdbc.html`

## CI

GitHub Actions workflow: `.github/workflows/ci.yml`

Runs on push/PR to `main`:

- `npm ci`
- `npm run lint`
- `npm run build`
