# Feature: Dashboard

## Description
The main landing page after login. Shows 4 metric cards (Total Stock, Units Sold,
Revenue, Profit) and a Recent Sales table with the last 5 sales. Sidebar navigation
on desktop, bottom nav on mobile. Frontend only — all data from mock-data.ts.

## Design Reference
- Pencil file: context/pencil-designs/ (frame: Dashboard)
- Key design decisions:
  - Dark layout: bg #0A0A0A, cards #1A1A1A, accent #00FF88
  - Sidebar fixed left (~210px, bg #111111), bottom nav on mobile
  - 4 metric cards in a single row (desktop) / 2x2 grid (mobile)
  - Each card: muted label + top-right Lucide icon, large bold value,
    accent-coloured sub-label (e.g. "+12 this week")
  - Recent Sales: card with "Recent Sales" header + "View All →" link,
    table columns: Buyer | Phone | Sale Price | Profit | Date
  - Profit column values in #00FF88
  - Top bar: page title "Dashboard", subtitle, bell icon, avatar circle "SA"

## Requirements
- [ ] Sidebar: FlipTrack logo, nav links (Dashboard, Inventory, Add Stock, Sell,
      Sales History), active state = accent bg + white text
- [ ] Top bar: title + subtitle + bell icon + avatar initials circle
- [ ] 4 metric cards: Total Stock / Units Sold / Revenue / Profit
- [ ] Recent Sales table: 5 rows, Buyer / Phone / Sale Price / Profit / Date
- [ ] "View All →" link (href="/sales-history", non-functional for now)
- [ ] All data from src/lib/mock-data.ts
- [ ] Mobile: sidebar hidden, bottom nav shown (5 icons + labels)
- [ ] Desktop: sidebar visible, bottom nav hidden

## Technical Notes
### Prisma
- Not applicable (frontend only)

### Clerk
- Auth required: No (no auth guard yet)

### Cloudinary
- Images needed: No

### Resend
- Email trigger: No

### Mock Data
- File: src/lib/mock-data.ts
- metrics shape: { totalStock, totalStockDelta, unitsSold, unitsSoldDelta,
  revenue, revenueDelta, profit, profitMargin }
- recentSales shape: { id, buyerName, phone, salePrice, costPrice, date }
- Use data matching the Pencil design screenshot exactly

### Components needed
- src/lib/mock-data.ts — single source of truth for all mock data
- src/app/(dashboard)/layout.tsx — shared layout: sidebar + bottom nav
- src/app/(dashboard)/page.tsx — dashboard page
- src/components/layout/Sidebar.tsx — desktop sidebar, fixed left
- src/components/layout/BottomNav.tsx — mobile bottom nav, fixed bottom
- src/components/layout/TopBar.tsx — title + bell + avatar
- src/components/dashboard/MetricCard.tsx — reusable metric card
- src/components/dashboard/RecentSalesTable.tsx — recent sales table
- Shadcn: Card, Table, Button, Separator

## Acceptance Criteria
- [ ] Works on mobile (375px) — bottom nav visible, sidebar hidden
- [ ] Works on desktop (1280px) — sidebar visible, bottom nav hidden
- [ ] Matches Pencil design layout exactly
- [ ] Numbers formatted as ZAR (R8,500 not 8500)
- [ ] Active nav state correct (Dashboard highlighted on load)
- [ ] npm run build passes

## Status
Not Started

## Notes
- Sidebar width: 210px fixed, no collapse
- MetricCard icons: Package, ShoppingCart, DollarSign, TrendingUp (lucide-react)
- mock-data.ts is shared across all features — do not duplicate it per feature
- No charts, filters, or date pickers in V1

## History
