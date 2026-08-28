# Risosoo Travels website

Premium marketing website for Risosoo Travels Int'l Ltd, built with Next.js App Router, TypeScript, Tailwind CSS and Sanity.

## Run locally

1. Copy `.env.example` to `.env.local` and fill in your Sanity and Resend values.
2. Run `npm install` then `npm run dev`.
3. Open `http://localhost:3000`; open `http://localhost:3000/studio` to manage content.

## Content and assets

The Studio provides documents for site settings, services, destinations, packages, posts and testimonials. The six launch destinations are listed in `sanity/seed-data.ts`; create/import them once the Sanity project is set up. Photography, logo, hero poster and hero video are intentionally empty: upload client-owned assets in Studio. The home hero is designed to accept a muted looping Sanity video with an image fallback when a client asset is added.

## Email

The contact endpoint validates required fields and includes a honeypot. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. Replace Resend's onboarding sender with a verified Risosoo sender domain before production.

## Deploy to Vercel

Push to GitHub, import the repository in Vercel, and copy all environment variables from `.env.local` to Vercel Project Settings. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` for both preview and production. Update `metadataBase` and sitemap domain in the app once the final domain is confirmed.
