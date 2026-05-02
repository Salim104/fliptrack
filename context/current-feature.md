# Current Feature: Sell — Backend Wiring (/sell)

## Feature File
`context/features/09-sell-backend.md`

## What to Build
1. src/lib/validations/sales.ts — Zod schema for sale form
2. src/app/actions/sales.ts — recordSale server action (auth + prisma transaction + redirect)
3. src/app/(dashboard)/sell/page.tsx — async server component, reads ?id from search
   params, fetches real StockItem, redirects if not found or SOLD
4. src/components/sell/PhoneDetailCard.tsx — add CldImage support, keep placeholder fallback
5. src/components/sell/SaleForm.tsx — wire to recordSale server action, loading state,
   error toast

## Build Order
Build in the order listed above — validation first, then action, then page, then
component updates.

## Design Reference
- No UI changes — same Sell page design from frontend phase
- Real stock item data replaces mock, real sale recorded on confirm

## Notes
- Frontend only change: page reads ?id search param (not hardcoded mock item)
- prisma.stockItem.findUnique({ where: { id } }) in server component
- If id missing or item.status === 'SOLD': redirect('/inventory')
- recordSale server action uses prisma.$transaction for atomic write
- soldBy: look up User.id from clerkId before transaction
- salePrice comes as string from form — parse to Float (parseFloat) before saving
- paymentMethod values: CASH | EFT | SNAPSCAN | YOCO | OTHER
- PhoneDetailCard: CldImage if item.images.length > 0, else Smartphone icon placeholder
- On success: redirect('/sales-history') from server action
- Inventory Sell button already passes href={`/sell?id=${item.id}`} — no change needed

## Status
`Not Started`

## History