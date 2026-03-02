# Pamper Me MVP (Single Monorepo)

Pamper Me is an Amazon-first public gifting profile. This project is intentionally shipped as **one repository (one monorepo)** containing web, mobile, API, Prisma, and shared packages.

## Monorepo layout
- `apps/web`: Next.js public wishlist + API routes
- `apps/mobile`: Expo shell app
- `packages/types`: shared TypeScript domain types
- `packages/api-client`: shared API client
- `packages/ui-tokens`: shared design tokens
- `prisma`: schema, migration, and seed

## Scripts
- `npm install`
- `npm run dev`
- `npm run test`
- `npm run db:migrate`
- `npm run db:seed`
- `npm run build`

## Environment
Copy `.env.example` to `.env` and set marketplace affiliate tags + database URL.
