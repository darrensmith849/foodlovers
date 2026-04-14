# FoodLovers — AI Development Context

## What This Is

Grocery delivery app with budgeting intelligence for SA and ZW markets.
Mobile-first (Expo/RN). Monorepo with pnpm workspaces + Turborepo.

## Architecture

- `apps/mobile` — Expo Router (tabs), primary product
- `packages/types` — shared TypeScript types (import as `@foodlovers/types`)
- `packages/budgeting-engine` — pure TS budget logic (import as `@foodlovers/budgeting-engine`)
- `packages/mock-data` — fixtures (import as `@foodlovers/mock-data`)
- `apps/admin`, `apps/marketing`, `services/api` — placeholders only

## Key Rules

- Every product has: retailCategoryId, budgetCategoryId, essentialityTier
- Currency model: `market` (ZA/ZW) + `currencyCode` (string, e.g. "ZAR", "USD")
- Prices stored in smallest currency unit (cents)
- Budgeting engine is pure TS — no UI dependencies, no side effects
- No Tamagui in V1 — use StyleSheet / simple styling
- No MSW — use static mock data fixtures
- No backend in V1 — everything runs client-side with mocked data
- No payments, auth, or dispatch in V1

## Commands

```bash
pnpm install          # install all workspace dependencies
cd apps/mobile        # navigate to mobile app
npx expo start        # start Expo dev server
```

## Formatting

Uses Biome. Run `pnpm format` from root.
