import Link from 'next/link'
import TopBar from '@/src/components/layout/TopBar'
import AddStockForm from '@/src/components/stock/AddStockForm'

export default function AddStockPage() {
  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10">
      <TopBar
        title="Add New Stock"
        action={
          <Link href="/inventory" className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            ← Back to Inventory
          </Link>
        }
      />
      <AddStockForm />
    </div>
  )
}
