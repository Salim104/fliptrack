'use client'

import { Download } from 'lucide-react'
import { type SaleRecord } from '@/src/lib/mock-data'
import { zar } from '@/src/lib/format'

interface SalesTableProps {
  sales: SaleRecord[]
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
          const profit = sale.salePrice - sale.costPrice
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
              <span className="w-40 text-sm shrink-0" style={{ color: '#888888' }}>{sale.date}</span>
              <span className="flex-1 text-sm text-white">{sale.phone}</span>
              <span className="flex-1 text-sm text-white">{sale.buyer}</span>
              <span className="w-28 text-sm font-semibold text-white shrink-0">{zar.format(sale.salePrice)}</span>
              <span className="w-24 text-sm font-semibold shrink-0" style={{ color: '#00FF88' }}>
                +{zar.format(profit)}
              </span>
              <span className="w-20 shrink-0">
                <button
                  onClick={() => console.log('Receipt:', sale)}
                  className="flex items-center justify-center rounded"
                  style={{ width: 32, height: 32 }}
                >
                  <Download size={16} color="#888888" />
                </button>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
