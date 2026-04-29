# Project: FlipTrack

## Client Overview
- **Client type:** iPhone dealer (street-level phone flipping operation)
- **Location:** Johannesburg, South Africa
- **Primary users:** Admin staff tracking stock and sales
- **Expected scale:** Small team, internal tool only

## Business Goals
- Track iPhone stock (in/out) accurately
- Record every sale with buyer details and proof of payment
- Monitor profit per unit and overall revenue
- Download PDF receipts per sale

## Tech Stack
- **Framework:** Next.js 15 App Router (TypeScript)
- **UI:** Tailwind CSS + Shadcn/ui (custom dark theme)
- **Auth:** Clerk — admin role only (V1)
- **Database:** Prisma + Neon (PostgreSQL)
- **Images:** Cloudinary via next-cloudinary
- **PDF:** @react-pdf/renderer
- **Deployment:** Vercel

## Design System
- **Mode:** Dark only
- **Background:** `#0A0A0A`
- **Cards:** `#1A1A1A`
- **Accent:** `#00FF88`
- **Text primary:** `#FFFFFF`
- **Text muted:** `#888888`
- **Mobile first:** Bottom nav on mobile, sidebar on desktop

## Database Models (Prisma)
- `User` — clerkId, name, email, role (ADMIN)
- `StockItem` — model, storage, color, condition, imei, costPrice, images[], status, addedBy
- `Sale` — stockItemId, buyerName, buyerPhone, salePrice, paymentMethod, images[], soldBy
- Enums: `Role`, `Condition` (BRAND_NEW | LIKE_NEW | GOOD | FAIR | POOR), `StockStatus` (IN_STOCK | SOLD), `PaymentMethod` (CASH | EFT | SNAPSCAN | YOCO | OTHER)

## V1 Scope
1. Admin login via Clerk
2. Add Stock page
3. Inventory page (grid, search, filter)
4. Sell flow (triggered from stock card)
5. Sales History page (profit per unit, PDF receipt download)
6. Dashboard (summary metrics)

## Out of Scope (V1)
- Customer-facing storefront
- Online payments
- Multi-role access
- Notifications

## Current Status
- Next.js project created
- All dependencies installed
- Shadcn initialized
- Prisma initialized + schema written
- **Next step:** Connect Neon database, run `prisma migrate dev`, build Add Stock page

## File Structure Conventions
- `context/` — planning docs (this file + feature specs)
- `context/features/` — one spec per feature
- `context/current-feature.md` — pointer to active feature spec
- `prisma/schema.prisma` — database schema
- `src/app/(dashboard)/` — all authenticated pages
- `src/components/` — shared components
- `src/lib/` — utilities, Prisma client, Cloudinary config