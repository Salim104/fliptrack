# Feature: Add Stock — Backend Wiring (/add-stock)

## Description
Wire the existing Add Stock frontend form to the Neon database via a Prisma server
action. On submit, create a real StockItem record linked to the logged-in Clerk user.
Image upload wired to Cloudinary via CldUploadWidget. On success, redirect to /inventory.

## Design Reference
- No design changes — UI already built in frontend phase
- Only behaviour changes: form submits to server action, images upload to Cloudinary,
  success redirects to /inventory, errors show inline toast

## Requirements
- [ ] Install next-cloudinary if not already installed
- [ ] Add Cloudinary env vars to .env.local:
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
      CLOUDINARY_API_KEY=...
      CLOUDINARY_API_SECRET=...
- [ ] Replace photo upload zone UI stub with real CldUploadWidget
      - Upload preset: create an unsigned preset in Cloudinary dashboard named "fliptrack"
      - On upload success: store returned public_id in form state (images array)
      - Show uploaded image preview replacing the camera placeholder
- [ ] Create server action: src/app/actions/stock.ts
      - Function: createStockItem(formData)
      - Auth: get current user via currentUser() from @clerk/nextjs/server
      - Look up internal User.id from clerkId: prisma.user.findUnique({ where: { clerkId } })
      - Create: prisma.stockItem.create({ data: { model, storage, color, condition,
        imei, costPrice, images, status: 'IN_STOCK', addedBy: user.id } })
      - On success: redirect('/inventory')
      - On error: return { error: string }
- [ ] Wire AddStockForm to call createStockItem server action on submit
- [ ] Add Zod validation in server action:
      model: z.string().min(1)
      storage: z.string().min(1)
      color: z.string().min(1)
      condition: z.enum(['BRAND_NEW','LIKE_NEW','GOOD','FAIR','POOR'])
      imei: z.string().length(15, 'IMEI must be 15 digits')
      costPrice: z.number().positive()
      images: z.array(z.string()).optional()
- [ ] Show toast on error (sonner), disable submit button during loading
- [ ] On IMEI duplicate (Prisma unique constraint): show "IMEI already exists" toast

## Technical Notes
### Prisma
- Action: prisma.stockItem.create()
- Unique constraint on imei — catch P2002 error code for duplicate IMEI
- addedBy: internal User.id (not clerkId) — must look up first

### Clerk
- Auth required: Yes
- Use currentUser() from @clerk/nextjs/server in server action
- If no user found: throw error / redirect to /sign-in

### Cloudinary
- Images needed: Yes
- Use CldUploadWidget from next-cloudinary
- Upload preset: "fliptrack" (unsigned, created in Cloudinary dashboard)
- Store public_id array on StockItem.images
- Show CldImage preview after upload

### Resend
- Email trigger: No

### Components needed
- src/app/actions/stock.ts — createStockItem server action
- src/components/stock/PhotoUploadZone.tsx — replace stub with CldUploadWidget
- src/components/stock/AddStockForm.tsx — wire to server action, add loading state
- src/lib/validations/stock.ts — Zod schema for stock form

## Acceptance Criteria
- [ ] Image uploads to Cloudinary, preview shown in upload zone
- [ ] Form submits and creates StockItem in Neon (verify in Prisma Studio)
- [ ] StockItem.addedBy links to correct User record
- [ ] IMEI duplicate shows error toast, does not create duplicate
- [ ] All fields validated — empty required fields blocked
- [ ] On success: redirects to /inventory
- [ ] Submit button shows loading state during submission
- [ ] npm run build passes

## Status
Not Started

## Notes
- Cloudinary upload preset must be set to "unsigned" in Cloudinary dashboard
- costPrice stored as Float in DB — parse from string input before saving
- condition enum values: BRAND_NEW | LIKE_NEW | GOOD | FAIR | POOR
- images field is String[] in Prisma — store public_ids not full URLs
- Prisma error code for unique constraint violation: P2002

## History
