# Feature: Clerk Authentication

## Description
Protect all dashboard routes with Clerk. Any unauthenticated user is redirected to
the Clerk-hosted sign-in page. Sign-in methods: email/password + Google OAuth.
After sign-in, sync the Clerk user to the Neon DB (create User record if not exists).
The sidebar avatar and initials are pulled from the real Clerk session.

## Design Reference
- No Pencil design — Clerk hosted sign-in page handles its own UI
- After login, user lands on / (Dashboard)
- Sidebar avatar: real user initials from Clerk session, same circle style as mock

## Requirements
- [ ] Install and configure Clerk: `@clerk/nextjs`
- [ ] Add Clerk env vars to `.env.local`:
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      CLERK_SECRET_KEY
      NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
      NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
- [ ] Wrap app in `<ClerkProvider>` in src/app/layout.tsx
- [ ] Create `middleware.ts` at project root — protect all routes under `/`,
      allow only `/sign-in` and `/sign-up` as public
- [ ] Create sign-in page: src/app/sign-in/[[...sign-in]]/page.tsx
      using Clerk `<SignIn />` component, centered on dark bg
- [ ] Create sign-up page: src/app/sign-up/[[...sign-up]]/page.tsx
      using Clerk `<SignUp />` component (optional, for future use)
- [ ] User sync: src/app/actions/users.ts — `syncUser` server action
      checks if Clerk user exists in DB, creates if not:
      `prisma.user.upsert({ where: { clerkId }, create: {...}, update: {} })`
- [ ] Call `syncUser` in src/app/(dashboard)/layout.tsx on every load
- [ ] Sidebar: replace hardcoded "SA" initials with real initials from Clerk session
      using `currentUser()` from `@clerk/nextjs/server`
- [ ] Enable Google OAuth in Clerk dashboard (done manually by developer)

## Technical Notes
### Prisma
- Upsert: `prisma.user.upsert({ where: { clerkId }, create: { clerkId, name, email, role: 'ADMIN' }, update: {} })`
- Called in dashboard layout server component

### Clerk
- Auth required: Yes — `clerkMiddleware` protects all routes
- Public routes: `/sign-in(.*)`, `/sign-up(.*)`
- Use `currentUser()` in server components, `useUser()` in client components

### Cloudinary
- Images needed: No

### Resend
- Email trigger: No

### Components needed
- middleware.ts — route protection
- src/app/layout.tsx — add ClerkProvider wrapper
- src/app/sign-in/[[...sign-in]]/page.tsx — Clerk SignIn component
- src/app/sign-up/[[...sign-up]]/page.tsx — Clerk SignUp component
- src/app/actions/users.ts — syncUser server action
- src/app/(dashboard)/layout.tsx — call syncUser, pass real user to children
- src/components/layout/Sidebar.tsx — replace "SA" with real initials from session

## Acceptance Criteria
- [ ] Visiting / without being logged in redirects to /sign-in
- [ ] Sign-in page renders with email + Google options
- [ ] After sign-in, user is redirected to /
- [ ] User record created in Neon DB on first sign-in (verify in Prisma Studio)
- [ ] Sidebar shows real user initials, not hardcoded "SA"
- [ ] npm run build passes

## Status
Not Started

## Notes
- Google OAuth must be enabled in the Clerk dashboard manually before testing
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY come from Clerk dashboard
  → Your App → API Keys
- Do not add a custom sign-in UI — use Clerk hosted components only
- `syncUser` uses upsert not create — safe to call on every page load

## History
