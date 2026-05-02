# Current Feature: Inventory — Backend Wiring (/inventory)

## Feature File
`context/features/08-inventory-backend.md`

## What to Build
1. src/app/(dashboard)/inventory/page.tsx — convert to async server component, fetch
   real StockItems from Neon via Prisma, pass to StockGrid
2. src/components/inventory/StockCard.tsx — add CldImage support with placeholder fallback

## Build Order
Build in the order listed above — page fetch first, then card image update.

## Design Reference
- No UI changes — same Inventory page design from frontend phase
- Real data replaces mock data, CldImage replaces placeholder where images exist

## Notes
- Frontend only changes: page.tsx + StockCard.tsx
- prisma.stockItem.findMany({ orderBy: { createdAt: 'desc' } }) in server component
- Subtitle count: filter fetched items by status === 'IN_STOCK', use .length
- StockCard CldImage: src={item.images[0]}, width=400, height=300, alt={item.model}
- Fallback: if item.images.length === 0, show existing grey placeholder
- Condition enum → display string map:
  BRAND_NEW → "Brand New", LIKE_NEW → "Like New", GOOD → "Good",
  FAIR → "Fair", POOR → "Poor"
- Do not delete mock-data.ts — Dashboard still uses metrics + recentSales

## Status
`Not Started`

## History