# Current Feature: Add Stock — Backend Wiring (/add-stock)

## Feature File
`context/features/07-add-stock-backend.md`

## What to Build
1. src/lib/validations/stock.ts — Zod schema for stock form
2. src/app/actions/stock.ts — createStockItem server action (auth + prisma + redirect)
3. src/components/stock/PhotoUploadZone.tsx — replace UI stub with real CldUploadWidget
4. src/components/stock/AddStockForm.tsx — wire to server action, loading state, error toasts

## Build Order
Build in the order listed above — validation schema first, then server action,
then upload zone, then form wiring.

## Design Reference
- No UI changes — same Add Stock page design from frontend phase
- Behaviour changes only: real upload, real submit, real redirect

## Notes
- Cloudinary env vars needed in .env.local before running:
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
  CLOUDINARY_API_KEY=...
  CLOUDINARY_API_SECRET=...
- Cloudinary upload preset name: "fliptrack" (unsigned — set in Cloudinary dashboard)
- Server action must look up internal User.id from clerkId before creating StockItem
- costPrice comes from form as string — parse to Float before prisma.create()
- Catch Prisma P2002 error for duplicate IMEI — show sonner toast "IMEI already exists"
- On success: redirect('/inventory') from server action
- Submit button disabled + spinner during submission
- images stored as public_id strings array, not full URLs

## Status
`Not Started`

## History