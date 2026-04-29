# Current Feature: Sales History (/sales-history)

## Feature File
`context/features/05-sales-history.md`

## What to Build
1. src/lib/mock-data.ts — add salesHistory array (7 rows matching Pencil design)
2. src/components/sales/SummaryCards.tsx — 3 metric cards (Total Sales, Revenue, Profit)
3. src/components/sales/SalesTable.tsx — full sales table with receipt icon per row
4. src/app/(dashboard)/sales-history/page.tsx — page, composes both components

## Build Order
Build in the order listed above — mock data first, then cards, then table, then page.

## Design Reference
- Pencil file: context/pencil-designs/ — use the Sales History frame
- 3 summary cards top: Total Sales / Total Revenue / Total Profit (profit in #00FF88)
- Table: Date | Phone | Buyer | Sale Price | Profit | Receipt
- Profit column per row in #00FF88
- Receipt column: lucide Download icon, onClick logs row to console
- "Export CSV" ghost button top-right with download icon

## Notes
- Frontend only — no Prisma, no Clerk, no API calls
- No PDF or CSV generation in this phase — both are console stubs
- Summary totals calculated from salesHistory array — not hardcoded
- Do not replace existing mock-data.ts exports — only extend with salesHistory
- Mobile: table wrapped in overflow-x-auto

## Status
`Not Started`

## History