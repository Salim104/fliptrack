'use client'

import type { Sale, StockItem } from '@prisma/client'
import { zar } from '@/src/lib/format'
import DownloadReceiptButton from './DownloadReceiptButton'

interface SalesTableProps {
  sales: (Sale & { stockItem: StockItem })[]
}

export default function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="overflow-x-auto">
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', minWidth: 640 }}
      >
        {/* Header */}
        <div
          className="flex items-center"
          style={{ background: 'var(--bg-sunken)', height: 40, padding: '0 20px' }}
        >
          <span className="w-40 text-xs font-semibold shrink-0" style={{ color: 'var(--text-muted)' }}>Date</span>
          <span className="flex-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Phone</span>
          <span className="flex-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Buyer</span>
          <span className="w-28 text-xs font-semibold shrink-0" style={{ color: 'var(--text-muted)' }}>Sale Price</span>
          <span className="w-24 text-xs font-semibold shrink-0" style={{ color: 'var(--text-muted)' }}>Profit</span>
          <span className="w-20 text-xs font-semibold shrink-0" style={{ color: 'var(--text-muted)' }}>Receipt</span>
        </div>

        {/* Rows */}
        {sales.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No sales recorded yet</p>
          </div>
        ) : null}
        {sales.map((sale, i) => {
          const profit = sale.salePrice - sale.stockItem.costPrice
          const isLast = i === sales.length - 1
          const date = new Date(sale.createdAt).toLocaleDateString('en-ZA', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          return (
            <div
              key={sale.id}
              className="flex items-center"
              style={{
                height: 52,
                padding: '0 20px',
                borderBottom: isLast ? 'none' : '1px solid var(--border)',
              }}
            >
              <span className="w-40 text-sm shrink-0" style={{ color: 'var(--text-muted)' }}>{date}</span>
              <span className="flex-1 text-sm text-white">{sale.stockItem.model} {sale.stockItem.storage}</span>
              <span className="flex-1 text-sm text-white">{sale.buyerName}</span>
              <span className="w-28 text-sm font-semibold text-white shrink-0">{zar.format(sale.salePrice)}</span>
              <span className="w-24 text-sm font-semibold shrink-0" style={{ color: 'var(--accent)' }}>
                +{zar.format(profit)}
              </span>
              <span className="w-20 shrink-0">
                <DownloadReceiptButton sale={sale} />
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
