'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import type { Sale, StockItem } from '@prisma/client'

interface Props {
  sale: Sale & { stockItem: StockItem }
}

export default function DownloadReceiptButton({ sale }: Props) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const [{ pdf }, { default: SaleReceipt }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./SaleReceipt'),
      ])

      const date = new Date(sale.createdAt).toISOString().split('T')[0]
      const filename = `receipt-${sale.buyerName}-${date}.pdf`

      const blob = await pdf(<SaleReceipt sale={sale} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center justify-center rounded"
      style={{ width: 32, height: 32, opacity: loading ? 0.5 : 1, cursor: loading ? 'wait' : 'pointer' }}
    >
      <Download size={16} color="var(--text-muted)" />
    </button>
  )
}
