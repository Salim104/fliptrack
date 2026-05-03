'use client'

import type { StockItem } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import { Smartphone } from 'lucide-react'
import { zar } from '@/src/lib/format'

const conditionLabel: Record<string, string> = {
  BRAND_NEW: 'Brand New',
  LIKE_NEW:  'Like New',
  GOOD:      'Good',
  FAIR:      'Fair',
  POOR:      'Poor',
}

export default function PhoneDetailCard({ item }: { item: StockItem }) {
  const specs: { label: string; value: string; accent?: boolean }[] = [
    { label: 'Storage',    value: item.storage },
    { label: 'Condition',  value: conditionLabel[item.condition] ?? item.condition },
    { label: 'Color',      value: item.color },
    { label: 'Cost Price', value: zar.format(item.costPrice), accent: true },
  ]

  return (
    <div
      className="flex flex-col gap-4 rounded-xl w-full lg:w-80 lg:flex-shrink-0"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 24 }}
    >
      {/* Phone image */}
      {item.images.length > 0 ? (
        <CldImage
          src={item.images[0]}
          alt={item.model}
          width={320}
          height={200}
          style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, display: 'block' }}
        />
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ width: '100%', height: 200, background: 'var(--bg-sunken)', borderRadius: 8 }}
        >
          <Smartphone size={64} color="var(--text-dim)" />
        </div>
      )}

      {/* Model name */}
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--foreground)' }}>{item.model}</h2>

      {/* Spec rows */}
      <div className="flex flex-col gap-2">
        {specs.map(({ label, value, accent }) => (
          <div key={label} className="flex items-center justify-between">
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{label}</span>
            <span style={{ color: accent ? 'var(--accent)' : 'var(--foreground)', fontSize: 13, fontWeight: 600 }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
