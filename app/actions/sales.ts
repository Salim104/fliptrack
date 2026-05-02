'use server'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/src/lib/db'
import { saleSchema } from '@/src/lib/validations/sales'

export async function recordSale(data: {
  stockItemId:   string
  buyerName:     string
  buyerPhone:    string
  salePrice:     string
  paymentMethod: string
}) {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const parsed = saleSchema.safeParse({
    ...data,
    salePrice: parseFloat(data.salePrice),
  })
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } })
  if (!dbUser) return { error: 'User not found. Please refresh.' }

  try {
    await prisma.$transaction([
      prisma.sale.create({
        data: {
          stockItemId:   parsed.data.stockItemId,
          buyerName:     parsed.data.buyerName,
          buyerPhone:    parsed.data.buyerPhone,
          salePrice:     parsed.data.salePrice,
          paymentMethod: parsed.data.paymentMethod,
          images:        [],
          soldBy:        dbUser.id,
        },
      }),
      prisma.stockItem.update({
        where: { id: parsed.data.stockItemId },
        data:  { status: 'SOLD' },
      }),
    ])
  } catch {
    return { error: 'Failed to record sale' }
  }

  redirect('/sales-history')
}
