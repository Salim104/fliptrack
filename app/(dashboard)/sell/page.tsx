import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stockItems } from '@/src/lib/mock-data'
import TopBar from '@/src/components/layout/TopBar'
import PhoneDetailCard from '@/src/components/sell/PhoneDetailCard'
import SaleForm from '@/src/components/sell/SaleForm'

export default async function SellPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  const item = (id ? stockItems.find((i) => i.id === id) : null)
    ?? stockItems.find((i) => i.status === 'IN_STOCK')

  if (!item) redirect('/inventory')

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10">
      <TopBar
        title="Sell Phone"
        action={
          <Link href="/inventory" className="text-sm font-medium" style={{ color: '#00FF88' }}>
            ← Back to Inventory
          </Link>
        }
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <PhoneDetailCard item={item} />
        <SaleForm item={item} />
      </div>
    </div>
  )
}
