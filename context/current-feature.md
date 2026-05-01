# Current Feature: Clerk Authentication

## Feature File
`context/features/06-clerk-auth.md`

## What to Build
1. middleware.ts — clerkMiddleware, protect all routes, public: /sign-in, /sign-up
2. src/app/layout.tsx — wrap with ClerkProvider
3. src/app/sign-in/[[...sign-in]]/page.tsx — Clerk SignIn component, dark centered page
4. src/app/sign-up/[[...sign-up]]/page.tsx — Clerk SignUp component
5. src/app/actions/users.ts — syncUser server action (upsert to Neon via Prisma)
6. src/app/(dashboard)/layout.tsx — call syncUser on load, pass session to layout
7. src/components/layout/Sidebar.tsx — replace hardcoded "SA" with real user initials

## Build Order
Build in the order listed above — middleware first, then provider, then pages,
then sync action, then layout, then sidebar update.

## Design Reference
- No Pencil design — Clerk hosted sign-in UI
- Sign-in page: centered on #0A0A0A dark background, Clerk component in the middle
- After sign-in: redirect to / (Dashboard)

## Notes
- Clerk env vars must be in .env.local (not .env):
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
  CLERK_SECRET_KEY=sk_...
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
- Get keys from Clerk Dashboard → Your App → API Keys
- Google OAuth: enabled in Clerk Dashboard → Social Connections → Google (done manually)
- Use clerkMiddleware from @clerk/nextjs/server (not deprecated authMiddleware)
- syncUser uses upsert — safe to call on every dashboard load
- currentUser() for server components, useUser() for client components
- Do not build a custom sign-in form — use Clerk <SignIn /> component only

## Status
`Not Started`

## History