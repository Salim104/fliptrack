# Feature: Inventory — Backend Wiring (/inventory)

## Description
Replace mock data on the Inventory page with real StockItems fetched from Neon via
Prisma. The page becomes a server component that fetches all stock items, passes them
to the existing StockGrid client component. Images displayed via CldImage from
next-cloudinary. Subtitle count reflects real IN_STOCK count from DB.

## Design Reference
- No design changes — same Inventory page design from frontend phase
- Behaviour changes only: real data from DB, real images from Cloudinary

## Requirements
- [ ] Convert src/app/(dashboard)/inventory/page.tsx to async server component
- [ ] Fetch all StockItems ordered by createdAt desc:
      prisma.stockItem.findMany({ orderBy: { createdAt: 'desc' } })
- [ ] Pass real data to StockGrid component
- [ ] Update StockCard to display CldImage when images array is not empty,
      fallback to placeholder if images is empty []
- [ ] Subtitle: count of IN_STOCK items from fetched data (not hardcoded 124)
- [ ] Search still works client-side on the fetched data (no changes needed to StockGrid)
- [ ] Remove mock stockItems import from this page

## Technical Notes
### Prisma
- Query: prisma.stockItem.findMany({ orderBy: { createdAt: 'desc' } })
- Run in server component — no API route needed
- Import prisma from src/lib/prisma.ts

### Clerk
- Auth required: Yes — already protected by middleware

### Cloudinary
- Images needed: Yes
- StockCard: if item.images.length > 0, show CldImage with src={item.images[0]}
- If item.images is empty, show existing placeholder (grey card + phone icon)
- CldImage from next-cloudinary, width=400 height=300

### Resend
- Email trigger: No

### Components needed
- src/app/(dashboard)/inventory/page.tsx — convert to async server component, real fetch
- src/components/inventory/StockCard.tsx — add CldImage support, keep placeholder fallback
- src/lib/mock-data.ts — keep file but remove stockItems if only used here

## Acceptance Criteria
- [ ] Real StockItems from Neon render in the grid
- [ ] Subtitle shows correct IN_STOCK count from DB
- [ ] Items with images show Cloudinary image
- [ ] Items without images show placeholder
- [ ] Search still filters correctly
- [ ] Empty state shown if no stock in DB
- [ ] npm run build passes

## Status
Not Started

## Notes
- Do not remove mock-data.ts entirely — recentSales and metrics still used by Dashboard
- Only remove the stockItems export from mock-data.ts if it is no longer used elsewhere
- StockItem.condition is an enum — map to display string in StockCard:
  BRAND_NEW → "Brand New", LIKE_NEW → "Like New", GOOD → "Good",
  FAIR → "Fair", POOR → "Poor"
- StockItem.status: IN_STOCK → green badge, SOLD → red badge (already built)

## History
