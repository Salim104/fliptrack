# Feature: Sell — Backend Wiring (/sell)

## Description
Wire the existing Sell page to real data. The page receives a stockItemId via query
param (?id=...) from the Inventory page Sell button. It fetches the real StockItem
from Neon and displays it in the left card. On confirm, a server action creates a
Sale record and updates the StockItem status to SOLD in a Prisma transaction.
On success, redirect to /sales-history.

## Design Reference
- No design changes — same Sell page design from frontend phase
- Behaviour changes: real stock item loaded from DB, real sale recorded to DB

## Requirements
- [ ] Read stockItemId from URL search params: /sell?id=ITEM_ID
- [ ] Fetch real StockItem: prisma.stockItem.findUnique({ where: { id } })
- [ ] If item not found or already SOLD: redirect to /inventory
- [ ] Display real item data in PhoneDetailCard (model, storage, color, condition,
      costPrice, images)
- [ ] PhoneDetailCard: show CldImage if item.images.length > 0, else placeholder
- [ ] Create server action: src/app/actions/sales.ts
      - Function: recordSale(formData)
      - Auth: get current user via currentUser(), look up User.id from clerkId
      - Validate with Zod: buyerName, buyerPhone, salePrice, paymentMethod
      - Prisma transaction:
        1. prisma.sale.create({ data: { stockItemId, buyerName, buyerPhone,
           salePrice, paymentMethod, soldBy: user.id } })
        2. prisma.stockItem.update({ where: { id: stockItemId },
           data: { status: 'SOLD' } })
      - On success: redirect('/sales-history')
      - On error: return { error: string }
- [ ] Wire SaleForm to call recordSale server action on confirm
- [ ] Estimated profit calculated from real costPrice (salePrice - costPrice)
- [ ] Submit button shows loading state during submission
- [ ] Show error toast on failure (sonner)

## Technical Notes
### Prisma
- Query: prisma.stockItem.findUnique({ where: { id } }) in server component
- Transaction in server action:
  prisma.$transaction([
    prisma.sale.create({ data: saleData }),
    prisma.stockItem.update({ where: { id }, data: { status: 'SOLD' } })
  ])
- soldBy: internal User.id (look up from clerkId first)

### Clerk
- Auth required: Yes — already protected by middleware
- Use currentUser() from @clerk/nextjs/server in server action

### Cloudinary
- Images needed: Yes — PhoneDetailCard shows CldImage if images exist

### Resend
- Email trigger: No

### Components needed
- src/app/(dashboard)/sell/page.tsx — async server component, reads ?id param,
  fetches StockItem, passes to client components
- src/app/actions/sales.ts — recordSale server action
- src/components/sell/PhoneDetailCard.tsx — add CldImage support
- src/components/sell/SaleForm.tsx — wire to recordSale, add loading state
- src/lib/validations/sales.ts — Zod schema for sale form

## Acceptance Criteria
- [ ] Clicking Sell on an inventory card loads the correct item on /sell page
- [ ] Real item data (model, storage, color, condition, costPrice) displayed
- [ ] Estimated profit calculates correctly from real costPrice
- [ ] Confirm Sale creates Sale record in Neon (verify in Prisma Studio)
- [ ] StockItem status updates to SOLD after sale
- [ ] Sold items show red badge on Inventory page after sale
- [ ] On success: redirects to /sales-history
- [ ] npm run build passes

## Status
Not Started

## Notes
- paymentMethod enum: CASH | EFT | SNAPSCAN | YOCO | OTHER
- salePrice from form is a string — parse to Float before saving
- If ?id param is missing or item is SOLD: redirect('/inventory')
- Transaction is atomic — both sale create and status update succeed or both fail
- Condition display map same as Inventory: BRAND_NEW → "Brand New" etc.

## History
