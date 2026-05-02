'use client'

import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import Link from 'next/link'
import type { StockItem } from '@prisma/client'
import StockCard from './StockCard'

export default function StockGrid({ items }: { items: StockItem[] }) {
  const [query, setQuery] = useState('')

  const inStockCount = items.filter((i) => i.status === 'IN_STOCK').length

  const filtered = query.trim()
    ? items.filter((i) =>
        i.model.toLowerCase().includes(query.toLowerCase())
      )
    : items

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="text-sm" style={{ color: '#888888' }}>
            {inStockCount} phones in stock
          </p>
        </div>

        {/* Search + button */}
        <div className="flex items-center gap-3">
          <div
            className="flex flex-1 lg:flex-none items-center gap-2"
            style={{
              width: undefined,
              height: 40,
              background: '#1A1A1A',
              border: '1px solid #222222',
              borderRadius: 8,
              padding: '0 12px',
            }}
          >
            <Search size={16} color="#555555" className="flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by model, IMEI..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder-[#555555]"
              style={{ color: '#FFFFFF', minWidth: 0 }}
            />
          </div>

          <Link
            href="/add-stock"
            className="flex items-center gap-2 rounded-lg text-sm font-bold flex-shrink-0"
            style={{
              height: 40,
              background: '#00FF88',
              color: '#0A0A0A',
              padding: '0 16px',
            }}
          >
            <Plus size={16} color="#0A0A0A" />
            Add Stock
          </Link>
        </div>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-sm" style={{ color: '#888888' }}>
            No stock found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <StockCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
