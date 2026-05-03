
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'
import TopBar from '@/src/components/layout/TopBar'
import MetricCard from '@/src/components/dashboard/MetricCard'
import RecentSalesTable from '@/src/components/dashboard/RecentSalesTable'
import { prisma } from '@/src/lib/db'
import { zar } from '@/src/lib/format'

export default async function DashboardPage() {
  const [totalStock, soldCount, allSales, recentSales] = await Promise.all([
    prisma.stockItem.count(),
    prisma.stockItem.count({ where: { status: 'SOLD' } }),
    prisma.sale.findMany({ include: { stockItem: true } }),
    prisma.sale.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { stockItem: true } }),
  ])

  const revenue = allSales.reduce((s, r) => s + r.salePrice, 0)
  const profit = allSales.reduce((s, r) => s + (r.salePrice - r.stockItem.costPrice), 0)
  const profitMargin = revenue > 0 ? (profit / revenue * 100).toFixed(1) + '% margin' : '0% margin'

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
          value={String(totalStock)}
          delta="Total in DB"
          icon={Package}
        />
        <MetricCard
          label="Units Sold"
          value={String(soldCount)}
          delta="All time"
          icon={ShoppingCart}
        />
        <MetricCard
          label="Revenue"
          value={zar.format(revenue)}
          delta="All time revenue"
          icon={DollarSign}
        />
        <MetricCard
          label="Profit"
          value={zar.format(profit)}
          delta={profitMargin}
          icon={TrendingUp}
        />
      </div>

      {/* Recent sales */}
      <RecentSalesTable sales={recentSales} />
    </div>
  )
}
