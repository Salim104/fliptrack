'use server'

import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/src/lib/db'

export async function syncUser() {
  const user = await currentUser()
  if (!user) return null

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')
  const name = fullName || (user.emailAddresses[0]?.emailAddress ?? 'Unknown')
  const email = user.emailAddresses[0]?.emailAddress ?? ''

  return prisma.user.upsert({
    where: { clerkId: user.id },
    update: { name, email },
    create: { clerkId: user.id, name, email },
  })
}
