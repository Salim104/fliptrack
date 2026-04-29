# Current Feature: Sell (/sell)

## Feature File
`context/features/04-sell.md`

## What to Build
1. src/components/sell/PhoneDetailCard.tsx — left card: photo, model, spec rows, cost price
2. src/components/sell/SaleForm.tsx — right card: all fields, profit banner, buttons
3. src/app/(dashboard)/sell/page.tsx — page, two-col layout, loads mock stock item

## Build Order
Build in the order listed above — detail card first, then form, then page.

## Design Reference
- Pencil file: context/pencil-designs/ — use the Sell frame
- Two-column layout: left card (phone info) + right card (sale form)
- Left card: photo top, model bold, spec label/value rows, Cost Price in #00FF88
- Right card: "Sale Details" heading, Buyer Name, Buyer Phone (+27 prefix),
  Sale Price + Payment Method same row, Estimated Profit banner, Cancel + Confirm Sale
- Estimated Profit banner: dark green tint bg, label left, live ZAR value right (accent)

## Notes
- Frontend only — no Prisma, no Clerk, no API calls
- Confirm Sale logs form state to console only
- Estimated Profit = salePrice - costPrice, recalculates on every Sale Price keystroke
- Phone data: use first IN_STOCK item from src/lib/mock-data.ts stockItems array
- Cancel and "Back to Inventory" both navigate to /inventory
- Payment Method options: Cash, EFT, SnapScan, Yoco, Other
- Mobile: left card stacks above right card (single column)

## Status
`Not Started`

## History