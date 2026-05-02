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
      style={{ background: '#1A1A1A', border: '1px solid #222222' }}
    >
      {/* Photo */}
      <div className="relative flex items-center justify-center" style={{ height: 160, background: '#111111' }}>
        {item.images.length > 0 ? (
          <CldImage
            src={item.images[0]}
            width={400}
            height={300}
            alt={item.model}
            className="object-cover w-full h-full"
          />
        ) : (
          <Smartphone size={48} color="#333333" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2" style={{ padding: 16 }}>
        <span className="text-sm font-semibold text-white">{item.model}</span>
        <span className="text-xs" style={{ color: '#888888' }}>
          {item.storage} · {item.color} · {conditionLabel[item.condition]}
        </span>

        {/* Price + badge */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold" style={{ color: '#00FF88' }}>
            {zar.format(item.costPrice)}
          </span>

          {isInStock ? (
            <span
              className="flex items-center gap-1.5 rounded-full text-xs font-semibold"
              style={{ background: '#00FF8818', color: '#00FF88', padding: '4px 10px' }}
            >
              <span
                className="rounded-full flex-shrink-0"
                style={{ width: 6, height: 6, background: '#00FF88', display: 'inline-block' }}
              />
              In Stock
            </span>
          ) : (
            <span
              className="flex items-center gap-1.5 rounded-full text-xs font-semibold"
              style={{ background: '#FF444418', color: '#FF4444', padding: '4px 10px' }}
            >
              <span
                className="rounded-full flex-shrink-0"
                style={{ width: 6, height: 6, background: '#FF4444', display: 'inline-block' }}
              />
              Sold
            </span>
          )}
        </div>

        {/* Sell button — only for in-stock items */}
        {isInStock && (
          <Link
            href={`/sell?id=${item.id}`}
            className="flex items-center justify-center rounded-lg text-sm font-bold mt-1"
            style={{ height: 36, background: '#00FF88', color: '#0A0A0A' }}
          >
            Sell
          </Link>
        )}
      </div>
    </div>
  )
}
