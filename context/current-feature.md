# Current Feature: Sales History — Backend Wiring + PDF Receipt (/sales-history)

## Feature File
`context/features/10-sales-history-backend.md`

## What to Build
1. src/components/sales/SaleReceipt.tsx — @react-pdf/renderer Document component
   (professional receipt layout for accountant)
2. src/components/sales/DownloadReceiptButton.tsx — client component, dynamic import
   of SaleReceipt (ssr: false), triggers pdf().download() on click
3. src/components/sales/ExportCSVButton.tsx — client component, generates CSV from
   sales array, triggers browser download
4. src/components/sales/SummaryCards.tsx — update to accept real data as props
5. src/components/sales/SalesTable.tsx — update to accept real Sale + StockItem data,
   wire DownloadReceiptButton per row
6. src/app/(dashboard)/sales-history/page.tsx — convert to async server component,
   fetch real sales with stockItem included, pass to components

## Build Order
Build in the order listed above — PDF receipt first, then buttons, then table
update, then page fetch.

## Design Reference
- No UI changes to the page — same Sales History design from frontend phase
- PDF receipt layout: clean, printable, professional
  * Header: "FlipTrack" bold + "Sales Receipt" subtitle
  * Two columns: label left, value right
  * Sections: Buyer Info / Phone Details / Transaction
  * Profit line bold with accent colour (#00FF88)
  * Footer: "Thank you for your business" + generated timestamp

## Notes
- @react-pdf/renderer: MUST use next/dynamic with ssr: false in DownloadReceiptButton
  — direct import will crash Next.js SSR
- PDF prop: Sale & { stockItem: StockItem } (Prisma types)
- PDF filename: receipt-[buyerName]-[YYYY-MM-DD].pdf
- CSV separator: semicolons (;) for Excel compatibility in South Africa
- CSV columns: Date;Phone;Buyer;Phone Number;Sale Price;Cost Price;Profit;Payment Method
- SummaryCards totals from real data:
    Total Sales = sales.length
    Total Revenue = sales.reduce((s, r) => s + r.salePrice, 0)
    Total Profit = sales.reduce((s, r) => s + (r.salePrice - r.stockItem.costPrice), 0)
- Do not delete mock-data.ts — Dashboard still uses it
- Condition display map: BRAND_NEW → "Brand New", LIKE_NEW → "Like New",
  GOOD → "Good", FAIR → "Fair", POOR → "Poor"

## Status
`Not Started`

## History