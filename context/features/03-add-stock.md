# Feature: Add Stock (/add-stock)

## Description
A form page where admins manually add a new iPhone to inventory. Left side has a
photo upload zone. Right side has a vertical form: Phone Model, Storage Capacity,
Color, Condition (two dropdowns side by side), IMEI Number, Cost Price. Cancel and
"+ Add to Stock" buttons at the bottom right. Frontend only — form submits to console,
no Prisma yet.

## Design Reference
- Pencil file: context/pencil-designs/ (frame: Add Stock)
- Key design decisions:
  - Page title "Add New Stock", "Back to Inventory" link top-right (accent green)
  - Single card container, dark #1A1A1A bg, rounded corners
  - Left column: square upload zone with camera icon + "Upload Photo" label +
    "Click or drag image here" subtext
  - Right column: stacked form fields with muted labels above each
  - Color + Condition on the same row (two dropdowns side by side, 50/50)
  - IMEI and Cost Price full-width inputs
  - Cost Price: R prefix inside input, placeholder "0.00"
  - Buttons bottom-right: "Cancel" (ghost) + "+ Add to Stock" (accent green)

## Requirements
- [ ] Page title "Add New Stock" + "Back to Inventory" link (href="/inventory")
- [ ] Photo upload zone: camera icon, "Upload Photo", "Click or drag image here"
      (UI only — no real upload in this phase)
- [ ] Phone Model dropdown: iPhone 11, 12, 12 Mini, 13, 13 Mini, 13 Pro, 13 Pro Max,
      14, 14 Plus, 14 Pro, 14 Pro Max, 15, 15 Plus, 15 Pro, 15 Pro Max
- [ ] Storage Capacity dropdown: 64GB, 128GB, 256GB, 512GB, 1TB
- [ ] Color dropdown: Space Black, Midnight, Starlight, Blue, Purple, Red,
      Natural, White, Pink, Yellow, Green
- [ ] Condition dropdown: Brand New, Like New, Good, Fair, Poor
- [ ] Color + Condition on same row, equal width
- [ ] IMEI Number input: placeholder "Enter IMEI number..."
- [ ] Cost Price input: R prefix, placeholder "0.00", numeric
- [ ] Cancel button: ghost style, href="/inventory"
- [ ] "+ Add to Stock" button: accent green, onClick logs form state to console
- [ ] All dropdowns use Shadcn Select component

## Technical Notes
### Prisma
- Not applicable (frontend only)

### Clerk
- Auth required: No

### Cloudinary
- Images needed: No — upload zone is UI only, no real upload yet

### Resend
- Email trigger: No

### Mock Data
- No mock data needed for this page

### Components needed
- src/app/(dashboard)/add-stock/page.tsx — page (can be client component)
- src/components/stock/AddStockForm.tsx — full form, all state, all fields
- src/components/stock/PhotoUploadZone.tsx — upload zone UI only
- Shadcn: Select, SelectTrigger, SelectContent, SelectItem, Input, Button, Label, Card

## Acceptance Criteria
- [ ] Works on mobile (375px) — form stacks vertically, upload zone above form
- [ ] Works on desktop (1280px) — two-column layout (upload left, form right)
- [ ] Matches Pencil design layout exactly
- [ ] All dropdowns open and selectable
- [ ] Cancel navigates back to /inventory
- [ ] Submit logs form values to console (no API call)
- [ ] npm run build passes

## Status
Not Started

## Notes
- No validation in this phase — validation comes when backend is wired
- Upload zone: onClick and onDrop are no-ops for now, just UI
- "Back to Inventory" link: small, top-right, accent green, plain anchor style
- Form card: centered on page with max-w, not full bleed

## History
