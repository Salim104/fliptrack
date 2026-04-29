import Link from 'next/link'
import { recentSales } from '@/src/lib/mock-data'

const fmt = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 0,
})

export default function RecentSalesTable() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: '#1A1A1A', border: '1px solid #222222' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: '16px 20px' }}
      >
        <span className="text-base font-semibold text-white">Recent Sales</span>
        <Link
          href="/sales-history"
          className="text-sm font-medium"
          style={{ color: '#00FF88' }}
        >
          View All →
        </Link>
      </div>

      {/* Column headers */}
      <div
        className="flex items-center"
        style={{
          background: '#111111',
          height: 40,
          padding: '0 20px',
        }}
      >
        <span className="flex-1 text-xs font-semibold" style={{ color: '#888888' }}>Buyer</span>
        <span className="flex-1 text-xs font-semibold" style={{ color: '#888888' }}>Phone</span>
        <span className="w-28 text-xs font-semibold" style={{ color: '#888888' }}>Sale Price</span>
        <span className="w-24 text-xs font-semibold" style={{ color: '#888888' }}>Profit</span>
        <span className="w-28 text-xs font-semibold" style={{ color: '#888888' }}>Date</span>
      </div>

      {/* Rows */}
      {recentSales.map((sale, i) => {
        const profit = sale.salePrice - sale.costPrice
        const isLast = i === recentSales.length - 1
        return (
          <div
            key={sale.id}
            className="flex items-center"
            style={{
              height: 52,
              padding: '0 20px',
              borderBottom: isLast ? 'none' : '1px solid #222222',
            }}
          >
            <span className="flex-1 text-sm font-medium text-white">{sale.buyerName}</span>
            <span className="flex-1 text-sm text-white">{sale.phone}</span>
            <span className="w-28 text-sm font-semibold text-white">{fmt.format(sale.salePrice)}</span>
            <span className="w-24 text-sm font-semibold" style={{ color: '#00FF88' }}>
              +{fmt.format(profit)}
            </span>
            <span className="w-28 text-sm" style={{ color: '#888888' }}>{sale.date}</span>
          </div>
        )
      })}
    </div>
  )
}
