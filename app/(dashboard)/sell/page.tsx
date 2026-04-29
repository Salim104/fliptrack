import Link from 'next/link'
import { stockItems } from '@/src/lib/mock-data'
import PhoneDetailCard from '@/src/components/sell/PhoneDetailCard'
import SaleForm from '@/src/components/sell/SaleForm'

const item = stockItems.find((i) => i.status === 'IN_STOCK')!

export default function SellPage() {
  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>Sell Phone</h1>
        <Link href="/inventory" className="text-sm" style={{ color: '#00FF88' }}>
          Back to Inventory
        </Link>
      </div>

      {/* Two-column layout: detail card left, form right */}
      <div className="flex flex-col lg:flex-row gap-8">
        <PhoneDetailCard item={item} />
        <SaleForm item={item} />
      </div>
    </div>
  )
}
