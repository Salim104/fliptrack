import type { StockItem } from '@/src/lib/mock-data'

const gradeLabel: Record<string, string> = {
  'Grade A': 'Excellent',
  'Grade B': 'Good',
  'Grade C': 'Fair',
  'Grade D': 'Poor',
}

function formatCostPrice(price: number) {
  return `R ${price.toLocaleString('en-ZA')}`
}

export default function PhoneDetailCard({ item }: { item: StockItem }) {
  const specs: { label: string; value: string; accent?: boolean }[] = [
    { label: 'Storage',    value: item.storage },
    { label: 'Condition',  value: gradeLabel[item.grade] ?? item.grade },
    { label: 'Color',      value: item.color },
    { label: 'Cost Price', value: formatCostPrice(item.costPrice), accent: true },
  ]

  return (
    <div
      className="flex flex-col gap-4 rounded-xl w-full lg:w-80 lg:flex-shrink-0"
      style={{ background: '#1A1A1A', border: '1px solid #222222', padding: 24 }}
    >
      {/* Phone image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.imageUrl}
        alt={item.model}
        style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, display: 'block' }}
      />

      {/* Model name */}
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>{item.model}</h2>

      {/* Spec rows */}
      <div className="flex flex-col gap-2">
        {specs.map(({ label, value, accent }) => (
          <div key={label} className="flex items-center justify-between">
            <span style={{ color: '#888888', fontSize: 13 }}>{label}</span>
            <span style={{ color: accent ? '#00FF88' : '#FFFFFF', fontSize: 13, fontWeight: 600 }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
