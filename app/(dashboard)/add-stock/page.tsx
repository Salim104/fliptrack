import Link from 'next/link'
import AddStockForm from '@/src/components/stock/AddStockForm'

export default function AddStockPage() {
  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>
          Add New Stock
        </h1>
        <Link
          href="/inventory"
          className="text-sm"
          style={{ color: '#00FF88' }}
        >
          Back to Inventory
        </Link>
      </div>

      <AddStockForm />
    </div>
  )
}
