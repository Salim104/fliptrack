# Feature: Dashboard — Backend Wiring (/)

## Description
Replace mock metrics and recentSales on the Dashboard with real data from Neon.
Metric cards show live counts and totals from the DB. Recent Sales table shows the
last 5 real sales. All queries run in parallel for performance.

## Design Reference
- No design changes — same Dashboard page from frontend phase
- Real numbers replace hardcoded mock values

## Requirements
- [ ] Convert src/app/(dashboard)/page.tsx to async server component
- [ ] Run all queries in parallel with Promise.all:
      1. Total stock count: prisma.stockItem.count()
      2. Units sold count: prisma.stockItem.count({ where: { status: 'SOLD' } })
      3. All sales with stockItem: prisma.sale.findMany({ include: { stockItem: true } })
      4. Recent 5 sales: prisma.sale.findMany({
           orderBy: { createdAt: 'desc' },
           take: 5,
           include: { stockItem: true }
         })
- [ ] Calculate metrics from query results:
      - totalStock: stockItem.count() result
      - unitsSold: SOLD count result
      - unitsInStock: totalStock - unitsSold
      - revenue: allSales.reduce((s, r) => s + r.salePrice, 0)
      - profit: allSales.reduce((s, r) => s + (r.salePrice - r.stockItem.costPrice), 0)
      - profitMargin: (profit / revenue * 100).toFixed(1) + "% margin" (show "0% margin" if no sales)
- [ ] Pass real metrics to MetricCard components
- [ ] Pass real recentSales to RecentSalesTable
- [ ] RecentSalesTable: update to accept Sale & { stockItem: StockItem } shape
      - Phone column: item.stockItem.model + " " + item.stockItem.storage
      - Buyer column: item.buyerName
      - Sale Price: item.salePrice
      - Profit: item.salePrice - item.stockItem.costPrice
      - Date: format item.createdAt as "DD MMM YYYY"
- [ ] Remove mock metrics and recentSales imports from dashboard page
- [ ] Sub-labels on metric cards ("+12 this week" etc.) — replace with neutral
      labels for now: "Total in DB", "All time", "All time revenue", "All time profit"

## Technical Notes
### Prisma
- All queries in Promise.all for parallel execution
- prisma.sale.findMany includes stockItem relation
- No raw SQL needed — all standard Prisma queries

### Clerk
- Auth required: Yes — already protected by middleware

### Cloudinary
- Images needed: No

### Resend
- Email trigger: No

### Components needed
- src/app/(dashboard)/page.tsx — convert to async server component, real queries
- src/components/dashboard/RecentSalesTable.tsx — update prop types to accept
  real Sale + StockItem data shape
- src/lib/mock-data.ts — can now remove metrics and recentSales exports
  (keep file only if other things still import from it, otherwise delete)

## Acceptance Criteria
- [ ] Metric cards show real counts and totals from Neon
- [ ] Recent Sales table shows last 5 real sales
- [ ] Profit margin calculated correctly
- [ ] Empty states handled (no sales yet: revenue R0, profit R0, margin 0%)
- [ ] All numbers formatted as ZAR
- [ ] npm run build passes

## Status
Not Started

## Notes
- Date formatting: use Intl.DateTimeFormat('en-ZA', { day: '2-digit', month: 'short',
  year: 'numeric' }) — no extra libraries needed
- profitMargin guard: if revenue === 0 return "0% margin" to avoid division by zero
- "View All →" link already points to /sales-history — no change needed
- mock-data.ts: check all imports across the project before deleting —
  if nothing else imports from it, delete it cleanly

## History
