'use server'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/src/lib/db'
import { stockSchema } from '@/src/lib/validations/stock'

const CONDITION_MAP: Record<string, string> = {
  'Brand New': 'BRAND_NEW',
  'Like New':  'LIKE_NEW',
  'Good':      'GOOD',
  'Fair':      'FAIR',
  'Poor':      'POOR',
}

export async function createStockItem(data: {
  model: string
  storage: string
  color: string
  condition: string
  imei: string
  costPrice: string
  images: string[]
}) {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const parsed = stockSchema.safeParse({
    ...data,
    condition: CONDITION_MAP[data.condition] ?? data.condition,
    costPrice: Number(data.costPrice),
  })
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } })
  if (!dbUser) return { error: 'User not found. Please refresh.' }

  try {
    await prisma.stockItem.create({
      data: {
        ...parsed.data,
        images: parsed.data.images ?? [],
        status: 'IN_STOCK',
        addedBy: dbUser.id,
      },
    })
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === 'P2002') return { error: 'IMEI already exists' }
    return { error: 'Failed to add stock item' }
  }

  redirect('/inventory')
}
