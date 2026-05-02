import { prisma } from '@/src/lib/db'
import StockGrid from '@/src/components/inventory/StockGrid'

export default async function InventoryPage() {
  const items = await prisma.stockItem.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="p-6">
      <StockGrid items={items} />
    </div>
  )
}
