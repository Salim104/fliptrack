'use client'

import { Download } from 'lucide-react'
import type { Sale, StockItem } from '@prisma/client'

interface Props {
  sales: (Sale & { stockItem: StockItem })[]
}

export default function ExportCSVButton({ sales }: Props) {
  const handleExport = () => {
    const header = 'Date;Phone;Buyer;Phone Number;Sale Price;Cost Price;Profit;Payment Method'
    const rows = sales.map((s) => {
      const date = new Date(s.createdAt).toLocaleDateString('en-ZA')
      const phone = `${s.stockItem.model} ${s.stockItem.storage}`
      const profit = s.salePrice - s.stockItem.costPrice
      return [
        date,
        phone,
        s.buyerName,
        s.buyerPhone,
        s.salePrice,
        s.stockItem.costPrice,
        profit,
        s.paymentMethod,
      ].join(';')
    })

    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sales-export.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"
      style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'transparent' }}
    >
      <Download size={15} />
      Export CSV
    </button>
  )
}
