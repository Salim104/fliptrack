'use client'

import { Download } from 'lucide-react'
import { salesHistory } from '@/src/lib/mock-data'
import TopBar from '@/src/components/layout/TopBar'
import SummaryCards from '@/src/components/sales/SummaryCards'
import SalesTable from '@/src/components/sales/SalesTable'

function ExportCsvButton() {
  return (
    <button
      onClick={() => console.log('Export CSV')}
      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"
      style={{ border: '1px solid #333333', color: '#888888', background: 'transparent' }}
    >
      <Download size={15} />
      Export CSV
    </button>
  )
}

export default function SalesHistoryPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <TopBar
        title="Sales History"
        subtitle="Full record of all completed sales"
        action={<ExportCsvButton />}
      />
      <SummaryCards sales={salesHistory} />
      <SalesTable sales={salesHistory} />
    </div>
  )
}
