# FoodLovers — AI Development Context

## What This Is

Premium grocery delivery app with budgeting intelligence for SA and ZW markets.
Mobile-first (Expo/RN). Monorepo with pnpm workspaces + Turborepo.

## Architecture

- `apps/mobile` — Expo Router (tabs), primary product
- `packages/types` — shared TypeScript types (import as `@foodlovers/types`)
- `packages/budgeting-engine` — pure TS budget logic (import as `@foodlovers/budgeting-engine`)
- `packages/mock-data` — fixtures (import as `@foodlovers/mock-data`)
- `apps/admin`, `apps/marketing`, `services/api` — placeholders only

## Design System

- Palette: "Fig & Yuzu" — see `apps/mobile/constants/Colors.ts`
- Import `palette` (not `brand`) from `@/constants/Colors`
- Core tokens: blackFig, deepAubergine, yuzuLime, papayaCoral, leafTeal, oatCream
- Use `palette.oatCream` for screen backgrounds
- Use `palette.deepAubergine` for premium dark cards
- Use `palette.yuzuLime` sparingly for CTAs and active states
- Use `palette.leafTeal` for positive/essential states
- Use `palette.papayaCoral` for treats/discretionary
- Use `TouchableOpacity` (not `Pressable`) for interactive buttons on web

## State Management

- Zustand stores in `apps/mobile/stores/`
- MMKV persistence (localStorage fallback on web)
- Stores: useCartStore, useUserStore, useBudgetStore, useOrderStore
- Cart budget breakdown computed via budgeting-engine

## Key Rules

- Every product has: retailCategoryId, budgetCategoryId, essentialityTier
- Currency model: `market` (ZA/ZW) + `currencyCode` (string, e.g. "ZAR", "USD")
- Prices stored in smallest currency unit (cents)
- Budgeting engine is pure TS — no UI dependencies, no side effects
- No Tamagui — use StyleSheet + simple styling
- No MSW — use static mock data fixtures
- No backend in V1 — everything runs client-side with mocked data
- No payments, auth, or dispatch in V1

## Commands

```bash
pnpm install          # install all workspace dependencies
cd apps/mobile        # navigate to mobile app
npx expo start --web  # start Expo web dev server
```

## Formatting

Uses Biome. Run `pnpm format` from root.
