# Feature: Sales History (/sales-history)

## Description
A full sales log page. Three summary metric cards at the top (Total Sales, Total Revenue,
Total Profit). Below is a table of all sales: Date, Phone, Buyer, Sale Price, Profit,
and a Receipt download icon per row. "Export CSV" button top-right. Frontend only —
data from mock-data.ts, receipt download and CSV export are UI-only stubs.

## Design Reference
- Pencil file: context/pencil-designs/ (frame: Sales History)
- Key design decisions:
  - Page title "Sales History", "Export CSV" button top-right (ghost, download icon)
  - Three summary cards in a row: Total Sales (plain number), Total Revenue (ZAR),
    Total Profit (ZAR in #00FF88)
  - Table below: Date | Phone | Buyer | Sale Price | Profit | Receipt
  - Profit column values in #00FF88
  - Receipt column: download icon button per row (onClick stub, no real PDF yet)
  - Table rows separated by subtle dividers, no alternating row bg
  - No filters, no search, no pagination in V1

## Requirements
- [ ] Page title "Sales History" + "Export CSV" button top-right (stub, no real export)
- [ ] 3 summary cards: Total Sales (count) / Total Revenue (ZAR) / Total Profit (ZAR)
- [ ] Total Profit card value in #00FF88
- [ ] Sales table: columns Date / Phone / Buyer / Sale Price / Profit / Receipt
- [ ] Profit column per row in #00FF88
- [ ] Receipt column: download icon (lucide DownloadIcon), onClick logs row to console
- [ ] All data from src/lib/mock-data.ts (extend with salesHistory array)
- [ ] Summary cards calculated from salesHistory array (sum, not hardcoded)

## Technical Notes
### Prisma
- Not applicable (frontend only)

### Clerk
- Auth required: No

### Cloudinary
- Images needed: No

### Resend
- Email trigger: No

### Mock Data
- Extend src/lib/mock-data.ts with salesHistory array
- salesHistory shape:
  { id, date, phone, buyer, salePrice, costPrice }
- profit calculated as salePrice - costPrice
- Use 7 rows matching the Pencil screenshot exactly:
  { "28 Apr 2026", "iPhone 15 Pro 256GB", "Sipho Ndlovu", 8500, 6400 }
  { "27 Apr 2026", "iPhone 13 128GB", "Lerato Molefe", 4200, 3150 }
  { "25 Apr 2026", "iPhone 14 Pro Max 256GB", "Thabo Mahlangu", 7800, 5200 }
  { "23 Apr 2026", "iPhone 12 64GB", "Nomsa Dlamini", 3100, 2250 }
  { "21 Apr 2026", "iPhone 15 128GB", "Bongani Mthembu", 6900, 5100 }
  { "19 Apr 2026", "iPhone 14 128GB", "Zanele Khumalo", 5400, 4000 }
  { "17 Apr 2026", "iPhone 11 64GB", "Mandla Sithole", 2300, 1700 }

### Components needed
- src/app/(dashboard)/sales-history/page.tsx — page
- src/components/sales/SummaryCards.tsx — 3 metric cards row
- src/components/sales/SalesTable.tsx — table with all columns
- Shadcn: Card, Table, Button

## Acceptance Criteria
- [ ] Works on mobile (375px) — table scrolls horizontally if needed
- [ ] Works on desktop (1280px) — matches Pencil layout exactly
- [ ] Summary card totals calculated correctly from salesHistory array
- [ ] Profit values in #00FF88 in both cards and table rows
- [ ] Receipt download icon present per row, onClick logs to console
- [ ] Export CSV button present, onClick logs to console
- [ ] npm run build passes

## Status
Not Started

## Notes
- No PDF generation in this phase — comes when backend is wired
- No CSV generation in this phase — Export CSV is a stub button
- Mobile table: wrap in overflow-x-auto container
- Total Profit card: accent green value only, label stays white/muted

## History
