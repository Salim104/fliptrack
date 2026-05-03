# Feature: Sales History — Backend Wiring + PDF Receipt (/sales-history)

## Description
Replace mock data on the Sales History page with real Sales fetched from Neon via
Prisma. Summary cards calculated from real data. Each row has a download button that
generates and downloads a PDF receipt using @react-pdf/renderer. The PDF is formatted
as a professional receipt for the accountant: sale details, buyer info, phone details,
profit breakdown.

## Design Reference
- No design changes to the table — same Sales History page from frontend phase
- PDF receipt: clean professional layout, FlipTrack branding, dark accent (#00FF88)
  used sparingly on totals, black and white printable

## Requirements
- [ ] Convert src/app/(dashboard)/sales-history/page.tsx to async server component
- [ ] Fetch all Sales with related StockItem:
      prisma.sale.findMany({
        orderBy: { createdAt: 'desc' },
        include: { stockItem: true }
      })
- [ ] Pass real data to SalesTable and SummaryCards
- [ ] SummaryCards: calculate Total Sales (count), Total Revenue (sum of salePrice),
      Total Profit (sum of salePrice - stockItem.costPrice) from real data
- [ ] Remove mock salesHistory import from this page
- [ ] PDF Receipt per row using @react-pdf/renderer:
      - Triggered by download icon button click on each row
      - Generated client-side (dynamic import, ssr: false)
      - PDF contents:
        * Header: "FlipTrack" logo text + "Sales Receipt" title
        * Date of sale
        * Buyer: name, phone number
        * Phone: model, storage, color, condition
        * IMEI number
        * Payment method
        * Cost Price, Sale Price, Profit (bold, accent)
        * Footer: "Thank you for your business" + generated date
      - Filename: receipt-[buyerName]-[date].pdf
- [ ] Export CSV button: generates and downloads a CSV of all sales
      - Columns: Date, Phone, Buyer, Phone Number, Sale Price, Cost Price, Profit,
        Payment Method
      - Triggered client-side, no server needed

## Technical Notes
### Prisma
- Query: prisma.sale.findMany({ orderBy: { createdAt: 'desc' }, include: { stockItem: true } })
- Run in server component
- Total profit: sales.reduce((sum, s) => sum + (s.salePrice - s.stockItem.costPrice), 0)

### Clerk
- Auth required: Yes — already protected by middleware

### Cloudinary
- Images needed: No

### Resend
- Email trigger: No

### PDF Generation
- Library: @react-pdf/renderer (already installed)
- Component: src/components/sales/SaleReceipt.tsx — PDF Document component
- Button: src/components/sales/DownloadReceiptButton.tsx — client component
  imports Receipt dynamically (ssr: false), calls pdf(<Receipt sale={sale} />).download()
- Sale prop shape: Sale & { stockItem: StockItem }

### CSV Export
- Client-side only — no library needed, use Blob + URL.createObjectURL
- Button: src/components/sales/ExportCSVButton.tsx — client component
- Receives full sales array as prop, generates CSV string, triggers download

### Components needed
- src/app/(dashboard)/sales-history/page.tsx — async server component, real fetch
- src/components/sales/SaleReceipt.tsx — @react-pdf/renderer Document
- src/components/sales/DownloadReceiptButton.tsx — dynamic import + download trigger
- src/components/sales/ExportCSVButton.tsx — CSV generation + download
- src/components/sales/SummaryCards.tsx — update to accept real data props
- src/components/sales/SalesTable.tsx — update to accept real Sale+StockItem data

## Acceptance Criteria
- [ ] Real sales from Neon render in the table
- [ ] Summary cards show correct totals calculated from real data
- [ ] PDF receipt downloads with correct sale data per row
- [ ] PDF is readable and professional — suitable for accountant
- [ ] CSV export downloads with all sales data
- [ ] Empty state shown if no sales in DB
- [ ] npm run build passes

## Status
Not Started

## Notes
- @react-pdf/renderer must be imported with next/dynamic + ssr: false — will break
  SSR if imported directly
- Condition display map: BRAND_NEW → "Brand New" etc. (same as other pages)
- PDF profit line: salePrice - stockItem.costPrice
- PDF filename format: receipt-[buyerName]-[YYYY-MM-DD].pdf
- CSV uses semicolons as separator for better Excel compatibility in South Africa

## History
