# FoodLovers

Mobile-first grocery delivery app with built-in budgeting intelligence for South Africa and Zimbabwe.

## Monorepo Structure

```
apps/
  mobile/           Expo / React Native customer app (primary product)
  admin/            Next.js admin dashboard (placeholder)
  marketing/        Next.js marketing site (placeholder)

packages/
  types/            Shared TypeScript types
  budgeting-engine/ Pure TS budget calculation logic
  mock-data/        Static product/category fixtures for development

services/
  api/              FastAPI backend (placeholder)

tooling/
  tsconfig/         Shared TypeScript configurations
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile app | Expo SDK 54, React Native, Expo Router |
| State | Zustand + MMKV (planned) |
| Admin | Next.js 15 (planned) |
| Backend | FastAPI + PostgreSQL (planned) |
| Monorepo | pnpm workspaces + Turborepo |
| Linting | Biome |

## Getting Started

```bash
pnpm install
cd apps/mobile && npx expo start
```

## Build Order

1. **Phase 0** (current): Monorepo foundation + shared packages + Expo shell
2. **Phase 1**: Mobile app screens (browse, cart, budget dashboard) with mock data
3. **Phase 2**: Backend integration (FastAPI + PostgreSQL)
4. **Phase 3**: Payments, delivery, auth
5. **Phase 4**: Intelligence, savings goals, multi-store

## Key Concept: Budget Intelligence

Every product is classified across three layers:
- **Retail category** (how the store organises it)
- **Budget category** (how the user sees spend)
- **Essentiality tier** (Essential / Semi-Essential / Discretionary)

Every cart shows real-time budget breakdown: category percentages, essential vs discretionary split, monthly budget impact, and contextual warnings.
