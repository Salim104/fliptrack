# Current Feature: Inventory (/inventory)

## Feature File
`context/features/02-inventory.md`

## What to Build
1. src/lib/mock-data.ts — add stockItems array (8 items matching Pencil design)
2. src/components/inventory/StockCard.tsx — card: photo, model, storage/color/grade, price, badge
3. src/components/inventory/StockGrid.tsx — client component: search state + 4-col grid
4. src/app/(dashboard)/inventory/page.tsx — inventory page, composes StockGrid

## Build Order
Build in the order listed above — mock data first, then card, then grid, then page.

## Design Reference
- Pencil file: context/pencil-designs/ — use the Inventory frame
- 4-col grid desktop, 2-col mobile
- Card: full-width photo (rounded top), model bold, muted storage · color · grade,
  cost price in #00FF88, status badge bottom-right
- Top bar: title + subtitle left, search input + "+ Add Stock" button right
- In Stock badge: green dot + green text; Sold badge: red dot + red text

## Notes
- Frontend only — no Prisma, no Clerk, no server actions
- All data from src/lib/mock-data.ts — extend the existing file, do not replace it
- Search filters by model name client-side
- "+ Add Stock" button href="/add-stock" (non-functional for now)
- Card click is non-functional this phase
- Use real photo URLs from Unsplash for the 8 mock stock items
- Subtitle "124 phones in stock" — hardcode from mock metrics or count IN_STOCK items

## Status
`Complete`

## History
- 2026-04-29: Implemented. Added stockItems to mock-data.ts (8 items matching Pencil design). Created StockCard, StockGrid (client, search state), inventory/page.tsx. Configured next.config.ts for Unsplash image domains. npm run build passes.