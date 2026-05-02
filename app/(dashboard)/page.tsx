
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'
import TopBar from '@/src/components/layout/TopBar'
import MetricCard from '@/src/components/dashboard/MetricCard'
import RecentSalesTable from '@/src/components/dashboard/RecentSalesTable'
import { metrics } from '@/src/lib/mock-data'

const fmt = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 0,
})

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <TopBar
        title="Dashboard"
        subtitle="Welcome back. Here's your overview."
      />

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Stock"
          value={String(metrics.totalStock)}
          delta={metrics.totalStockDelta}
          icon={Package}
        />
        <MetricCard
          label="Units Sold"
          value={String(metrics.unitsSold)}
          delta={metrics.unitsSoldDelta}
          icon={ShoppingCart}
        />
        <MetricCard
          label="Revenue"
          value={fmt.format(metrics.revenue)}
          delta={metrics.revenueDelta}
          icon={DollarSign}
        />
        <MetricCard
          label="Profit"
          value={fmt.format(metrics.profit)}
          delta={metrics.profitMargin}
          icon={TrendingUp}
        />
      </div>

      {/* Recent sales */}
      <RecentSalesTable />
    </div>
  )
}
