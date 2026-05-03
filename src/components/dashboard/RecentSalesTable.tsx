import Link from 'next/link'
import type { Sale, StockItem } from '@prisma/client'
import { zar } from '@/src/lib/format'

type SaleWithItem = Sale & { stockItem: StockItem }

interface Props {
  sales: SaleWithItem[]
}

const dateFmt = new Intl.DateTimeFormat('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })

export default function RecentSalesTable({ sales }: Props) {
  return (
    <div
      className="rounded-xl"
      style={{ background: '#1A1A1A', border: '1px solid #222222' }}
    >
      {/* Card header — always visible, never scrolls */}
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

      {/* Scrollable table body */}
      <div className="overflow-x-auto rounded-b-xl">
        <div style={{ minWidth: 560 }}>
          {/* Column headers */}
          <div
            className="flex items-center"
            style={{ background: '#111111', height: 40, padding: '0 20px' }}
          >
            <span className="flex-1 text-xs font-semibold" style={{ color: '#888888' }}>Buyer</span>
            <span className="flex-1 text-xs font-semibold" style={{ color: '#888888' }}>Phone</span>
            <span className="w-28 text-xs font-semibold shrink-0" style={{ color: '#888888' }}>Sale Price</span>
            <span className="w-24 text-xs font-semibold shrink-0" style={{ color: '#888888' }}>Profit</span>
            <span className="w-28 text-xs font-semibold shrink-0" style={{ color: '#888888' }}>Date</span>
          </div>

          {/* Rows */}
          {sales.length === 0 ? (
            <div
              className="flex items-center justify-center"
              style={{ height: 52, padding: '0 20px' }}
            >
              <span className="text-sm" style={{ color: '#888888' }}>No sales yet</span>
            </div>
          ) : (
            sales.map((sale, i) => {
              const profit = sale.salePrice - sale.stockItem.costPrice
              const isLast = i === sales.length - 1
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
                  <span className="flex-1 text-sm text-white">{sale.stockItem.model} {sale.stockItem.storage}</span>
                  <span className="w-28 text-sm font-semibold text-white shrink-0">{zar.format(sale.salePrice)}</span>
                  <span className="w-24 text-sm font-semibold shrink-0" style={{ color: '#00FF88' }}>
                    +{zar.format(profit)}
                  </span>
                  <span className="w-28 text-sm shrink-0" style={{ color: '#888888' }}>{dateFmt.format(sale.createdAt)}</span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
