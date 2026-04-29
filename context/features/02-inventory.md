# Feature: Inventory (/inventory)

## Description
Grid view of all stock items. Each card shows a photo, model name, storage/color/grade,
cost price, and a status badge (In Stock / Sold). Search bar and "+ Add Stock" button
in the top bar. Frontend only — data from mock-data.ts.

## Design Reference
- Pencil file: context/pencil-designs/ (frame: Inventory)
- Key design decisions:
  - Same dark layout as dashboard: bg #0A0A0A, cards #1A1A1A
  - 4-column grid desktop, 2-column mobile
  - Each card: full-width photo top (rounded top corners), model name bold,
    storage · color · grade in muted text, cost price in #00FF88, status badge bottom-right
  - In Stock badge: green dot + "In Stock" text (accent green)
  - Sold badge: red dot + "Sold" text (red)
  - Top bar: "Inventory" title + "124 phones in stock" subtitle,
    search input right-aligned, "+ Add Stock" accent button
  - Search input: dark bg, magnifier icon, placeholder "Search by model, IMEI..."

## Requirements
- [ ] Page title "Inventory" + subtitle "{count} phones in stock"
- [ ] Search input — filters cards client-side by model name (no IMEI in mock data)
- [ ] "+ Add Stock" button (href="/add-stock", non-functional for now)
- [ ] 4-col grid desktop / 2-col mobile
- [ ] Each card: photo, model, storage · color · grade, cost price, status badge
- [ ] In Stock badge: accent green; Sold badge: red
- [ ] All data from src/lib/mock-data.ts (extend stockItems array)
- [ ] Empty state: "No stock found" if search returns nothing

## Technical Notes
### Prisma
- Not applicable (frontend only)

### Clerk
- Auth required: No

### Cloudinary
- Images needed: No — use real iPhone stock photo URLs (unsplash or placeholder)

### Resend
- Email trigger: No

### Mock Data
- Extend src/lib/mock-data.ts with stockItems array
- stockItems shape:
  { id, model, storage, color, grade, costPrice, status, imageUrl }
- status: "IN_STOCK" | "SOLD"
- grade: "Grade A" | "Grade B" | "Grade C"
- Include 8 items matching the Pencil screenshot exactly

### Components needed
- src/app/(dashboard)/inventory/page.tsx — inventory page
- src/components/inventory/StockGrid.tsx — client component, search state + grid
- src/components/inventory/StockCard.tsx — individual card
- Shadcn: Badge, Input, Button

## Acceptance Criteria
- [ ] Works on mobile (375px) — 2-col grid
- [ ] Works on desktop (1280px) — 4-col grid
- [ ] Matches Pencil design layout exactly
- [ ] Search filters cards correctly, empty state shown when no results
- [ ] Status badges render correct colour
- [ ] npm run build passes

## Status
Not Started

## Notes
- Card click is non-functional in this phase — detail sheet comes in a later feature
- Cost price label uses #00FF88 (same as dashboard accent)
- Grade displayed as "Grade A" not just "A"
- Subtitle count should reflect the length of the IN_STOCK items in mock data

## History
