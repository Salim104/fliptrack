import type { Sale, StockItem } from '@prisma/client'
import { zar } from '@/src/lib/format'

interface SummaryCardsProps {
  sales: (Sale & { stockItem: StockItem })[]
}

export default function SummaryCards({ sales }: SummaryCardsProps) {
  const totalSales = sales.length
  const totalRevenue = sales.reduce((sum, s) => sum + s.salePrice, 0)
  const totalProfit = sales.reduce((sum, s) => sum + (s.salePrice - s.stockItem.costPrice), 0)

  const cards = [
    { label: 'Total Sales', value: String(totalSales), green: false },
    { label: 'Total Revenue', value: zar.format(totalRevenue), green: false },
    { label: 'Total Profit', value: zar.format(totalProfit), green: true },
  ]

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex-1 flex flex-col gap-2 rounded-xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '16px 20px' }}
        >
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{card.label}</span>
          <span
            className="text-3xl font-extrabold leading-none"
            style={{ color: card.green ? 'var(--accent)' : 'var(--foreground)' }}
          >
            {card.value}
          </span>
        </div>
      ))}
    </div>
  )
}
