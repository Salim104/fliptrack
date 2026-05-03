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
        style={{ background: '#1A1A1A', border: '1px solid #222222', minWidth: 640 }}
      >
        {/* Header */}
        <div
          className="flex items-center"
          style={{ background: '#111111', height: 40, padding: '0 20px' }}
        >
          <span className="w-40 text-xs font-semibold shrink-0" style={{ color: '#888888' }}>Date</span>
          <span className="flex-1 text-xs font-semibold" style={{ color: '#888888' }}>Phone</span>
          <span className="flex-1 text-xs font-semibold" style={{ color: '#888888' }}>Buyer</span>
          <span className="w-28 text-xs font-semibold shrink-0" style={{ color: '#888888' }}>Sale Price</span>
          <span className="w-24 text-xs font-semibold shrink-0" style={{ color: '#888888' }}>Profit</span>
          <span className="w-20 text-xs font-semibold shrink-0" style={{ color: '#888888' }}>Receipt</span>
        </div>

        {/* Rows */}
        {sales.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm" style={{ color: '#888888' }}>No sales recorded yet</p>
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
                borderBottom: isLast ? 'none' : '1px solid #222222',
              }}
            >
              <span className="w-40 text-sm shrink-0" style={{ color: '#888888' }}>{date}</span>
              <span className="flex-1 text-sm text-white">{sale.stockItem.model} {sale.stockItem.storage}</span>
              <span className="flex-1 text-sm text-white">{sale.buyerName}</span>
              <span className="w-28 text-sm font-semibold text-white shrink-0">{zar.format(sale.salePrice)}</span>
              <span className="w-24 text-sm font-semibold shrink-0" style={{ color: '#00FF88' }}>
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
