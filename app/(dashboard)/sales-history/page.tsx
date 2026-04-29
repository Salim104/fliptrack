'use client'

import { Download } from 'lucide-react'
import { salesHistory } from '@/src/lib/mock-data'
import SummaryCards from '@/src/components/sales/SummaryCards'
import SalesTable from '@/src/components/sales/SalesTable'

export default function SalesHistoryPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales History</h1>
          <p className="text-sm mt-1" style={{ color: '#888888' }}>Full record of all completed sales</p>
        </div>
        <button
          onClick={() => console.log('Export CSV')}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"
          style={{ border: '1px solid #333333', color: '#888888', background: 'transparent' }}
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      <SummaryCards sales={salesHistory} />
      <SalesTable sales={salesHistory} />
    </div>
  )
}
