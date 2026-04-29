# Feature: Dashboard

## Description
The main landing page after login. Shows 4 metric cards (Total Stock, Units Sold,
Revenue, Profit) and a Recent Sales table with the last 5 sales. Sidebar navigation
on desktop, bottom nav on mobile. Frontend only — all data from mock-data.ts.

## Design Reference
- Pencil file: context/pencil-designs/ (frame: Dashboard)
- Key design decisions:
  - Dark layout: bg #0A0A0A, cards #1A1A1A, accent #00FF88
  - Sidebar fixed left on desktop (dark #111111), bottom nav on mobile
  - 4 metric cards in a single row (desktop) / 2x2 grid (mobile)
  - Each metric card: muted label top-right icon, large bold value, accent-coloured
    sub-label (e.g. "+12 this week")
  - Recent Sales section: card with header row ("Recent Sales" + "View All →" link),
    table columns: Buyer | Phone | Sale Price | Profit | Date
  - Profit column values in accent green (#00FF88)
  - Top bar: page title "Dashboard", subtitle, bell icon, user avatar (initials)

## Requirements
- [ ] Sidebar: FlipTrack logo + icon, nav links (Dashboard, Inventory, Add Stock,
      Sell, Sales History) with active state highlight (accent bg, white text)
- [ ] Top bar: title, subtitle, notification bell, user avatar circle with initials
- [ ] 4 metric cards: Total Stock, Units Sold, Revenue, Profit — each with icon,
      value, and accent sub-label
- [ ] Recent Sales table: last 5 rows, columns Buyer / Phone / Sale Price / Profit / Date
- [ ] "View All →" link in section header (routes to /sales-history, non-functional for now)
- [ ] All data imported from src/lib/mock-data.ts
- [ ] Mobile: sidebar hidden, bottom nav shown (5 icons with labels)
- [ ] Active nav item highlighted on both sidebar and bottom nav

## Technical Notes
### Prisma
- Not applicable (frontend only)

### Clerk
- Auth required: No (frontend only, no auth guard)

### Cloudinary
- Images needed: No

### Resend
- Email trigger: No

### Mock Data
- File: src/lib/mock-data.ts
- Export: metrics object + recentSales array
- recentSales shape:
  { id, buyerName, phone, model, storage, salePrice, costPrice, date }
- metrics shape:
  { totalStock, totalStockDelta, unitsSold, unitsSoldDelta,
    revenue, revenueDelta, profit, profitMargin }

### Components needed
- src/app/(dashboard)/layout.tsx — shared layout with sidebar + bottom nav
- src/app/(dashboard)/page.tsx — dashboard page (or /dashboard/page.tsx)
- src/components/layout/Sidebar.tsx — desktop sidebar
- src/components/layout/BottomNav.tsx — mobile bottom nav
- src/components/layout/TopBar.tsx — top bar with title + avatar
- src/components/dashboard/MetricCard.tsx — reusable metric card
- src/components/dashboard/RecentSalesTable.tsx — table component
- src/lib/mock-data.ts — all mock data for the app
- Shadcn: Card, Badge, Button, Separator, Table

## Acceptance Criteria
- [ ] Works on mobile (375px) — bottom nav visible, sidebar hidden
- [ ] Works on desktop (1280px) — sidebar visible, bottom nav hidden
- [ ] Matches Pencil design layout exactly
- [ ] Mock data renders correctly in all components
- [ ] Active nav state works (Dashboard highlighted on load)
- [ ] Numbers formatted as ZAR (R348,500 not 348500)
- [ ] npm run build passes

## Status
Not Started

## Notes
- Sidebar width: ~210px fixed
- Bottom nav: 5 equal-width items, icons + labels, accent on active
- MetricCard icons: use Lucide icons (Package, ShoppingCart, DollarSign, TrendingUp)
- Keep mock-data.ts as the single source of truth for all features going forward —
  other feature specs will import from the same file

## History