# Current Feature: Dashboard — Backend Wiring (/)

## Feature File
`context/features/11-dashboard-backend.md`

## What to Build
1. src/app/(dashboard)/page.tsx — convert to async server component, run all Prisma
   queries in parallel with Promise.all, calculate metrics, pass real data to components
2. src/components/dashboard/RecentSalesTable.tsx — update prop types to accept
   real Sale & { stockItem: StockItem } data, update column rendering

## Build Order
Build in the order listed above — page queries first, then table prop update.

## Design Reference
- No UI changes — same Dashboard design from frontend phase
- Real numbers replace mock values in metric cards and recent sales table

## Notes
- Frontend only change: page.tsx + RecentSalesTable.tsx
- Promise.all queries:
    [totalStock, soldCount, allSales, recentSales] = await Promise.all([
      prisma.stockItem.count(),
      prisma.stockItem.count({ where: { status: 'SOLD' } }),
      prisma.sale.findMany({ include: { stockItem: true } }),
      prisma.sale.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { stockItem: true } })
    ])
- Revenue = allSales.reduce((s, r) => s + r.salePrice, 0)
- Profit = allSales.reduce((s, r) => s + (r.salePrice - r.stockItem.costPrice), 0)
- ProfitMargin = revenue > 0 ? (profit / revenue * 100).toFixed(1) + "% margin" : "0% margin"
- RecentSalesTable Phone column: stockItem.model + " " + stockItem.storage
- Date format: Intl.DateTimeFormat('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })
- Sub-labels on metric cards: replace delta strings with "Total in DB", "All time",
  "All time revenue", "All time profit"
- Remove mock metrics + recentSales from mock-data.ts if no other file imports them
  (check before deleting)

## Status
`Not Started`

## History