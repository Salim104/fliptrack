import Link from 'next/link'
import { Smartphone } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import type { StockItem } from '@prisma/client'
import { zar } from '@/src/lib/format'

const conditionLabel: Record<string, string> = {
  BRAND_NEW: 'Brand New',
  LIKE_NEW: 'Like New',
  GOOD: 'Good',
  FAIR: 'Fair',
  POOR: 'Poor',
}

export default function StockCard({ item }: { item: StockItem }) {
  const isInStock = item.status === 'IN_STOCK'

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      {/* Photo */}
      <div className="relative flex items-center justify-center" style={{ height: 160, background: 'var(--bg-sunken)' }}>
        {item.images.length > 0 ? (
          <CldImage
            src={item.images[0]}
            width={400}
            height={300}
            alt={item.model}
            className="object-cover w-full h-full"
          />
        ) : (
          <Smartphone size={48} color="var(--text-dim)" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2" style={{ padding: 16 }}>
        <span className="text-sm font-semibold text-white">{item.model}</span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {item.storage} · {item.color} · {conditionLabel[item.condition]}
        </span>

        {/* Price + badge */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold" style={{ color: 'var(--accent)' }}>
            {zar.format(item.costPrice)}
          </span>

          {isInStock ? (
            <span
              className="flex items-center gap-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'var(--accent-dim)', color: 'var(--accent)', padding: '4px 10px' }}
            >
              <span
                className="rounded-full flex-shrink-0"
                style={{ width: 6, height: 6, background: 'var(--accent)', display: 'inline-block' }}
              />
              In Stock
            </span>
          ) : (
            <span
              className="flex items-center gap-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'var(--danger-dim)', color: 'var(--danger)', padding: '4px 10px' }}
            >
              <span
                className="rounded-full flex-shrink-0"
                style={{ width: 6, height: 6, background: 'var(--danger)', display: 'inline-block' }}
              />
              Sold
            </span>
          )}
        </div>

        {/* Sell button — only for in-stock items */}
        {isInStock && (
          <Link
            href={`/sell?id=${item.id}`}
            prefetch={false}
            className="flex items-center justify-center rounded-lg text-sm font-bold mt-1"
            style={{ height: 36, background: 'var(--accent)', color: 'var(--background)' }}
          >
            Sell
          </Link>
        )}
      </div>
    </div>
  )
}
