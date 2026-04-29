# Feature: Sell (/sell)

## Description
A two-column page where admins record a sale. Left card shows the selected phone's
details (photo, model, specs, cost price). Right card is the sale form: buyer name,
buyer phone, sale price, payment method, estimated profit (live calculated), and
Confirm Sale button. Frontend only — form submits to console, no Prisma yet.

## Design Reference
- Pencil file: context/pencil-designs/ (frame: Sell)
- Key design decisions:
  - Page title "Sell Phone", "Back to Inventory" link top-right (accent green)
  - Left card: phone photo (top, rounded), model name bold, specs in a label/value
    table (Storage, Condition, Color, Cost Price), Cost Price value in #00FF88
  - Right card: "Sale Details" heading, then stacked fields
  - Buyer Phone: prefix "+27 ..." inside input
  - Sale Price + Payment Method on same row (50/50)
  - Estimated Profit: full-width dark green banner card below the row,
    "Estimated Profit" label left, live ZAR value right (accent green, bold)
  - Estimated Profit = Sale Price - Cost Price, updates live as sale price is typed
  - Buttons bottom-right: "Cancel" (ghost) + "✓ Confirm Sale" (accent green)

## Requirements
- [ ] Page title "Sell Phone" + "Back to Inventory" link (href="/inventory")
- [ ] Left card: phone image, model name, Storage / Condition / Color / Cost Price rows
- [ ] Right card "Sale Details":
      - Buyer Name input (placeholder "Enter buyer name...")
      - Buyer Phone input (prefix "+27 ...", placeholder "...")
      - Sale Price (ZAR) input: R prefix, numeric, placeholder "0.00"
      - Payment Method dropdown: Cash, EFT, SnapScan, Yoco, Other
      - Sale Price + Payment Method on same row
      - Estimated Profit banner: live calculated (salePrice - costPrice)
      - Cancel button (ghost, href="/inventory")
      - Confirm Sale button (accent green, onClick logs form to console)
- [ ] Estimated Profit recalculates on every Sale Price keystroke
- [ ] Phone data loaded from a single mock stock item in mock-data.ts

## Technical Notes
### Prisma
- Not applicable (frontend only)

### Clerk
- Auth required: No

### Cloudinary
- Images needed: No — use existing imageUrl from mock stockItems

### Resend
- Email trigger: No

### Mock Data
- Use the first IN_STOCK item from stockItems in src/lib/mock-data.ts
- In the real app this will come from a route param — for now hardcode index 0
- The selected item provides: model, storage, condition, color, costPrice, imageUrl

### Components needed
- src/app/(dashboard)/sell/page.tsx — page, two-col layout
- src/components/sell/PhoneDetailCard.tsx — left card with photo + spec rows
- src/components/sell/SaleForm.tsx — right card with all form fields + profit banner
- Shadcn: Card, Input, Select, Button, Label

## Acceptance Criteria
- [ ] Works on mobile (375px) — left card stacks above right card
- [ ] Works on desktop (1280px) — two-column layout side by side
- [ ] Matches Pencil design layout exactly
- [ ] Estimated Profit updates live as sale price is typed
- [ ] Confirm Sale logs form values to console
- [ ] Cancel navigates to /inventory
- [ ] npm run build passes

## Status
Not Started

## Notes
- Estimated Profit banner: bg slightly lighter green tint (#00FF8815), border accent,
  label muted left, value bold accent right
- Condition displayed as "Excellent" not enum value — map in mock data
- No validation in this phase
- In the real app /sell will receive a stockItemId param — mock it for now with item[0]

## History
