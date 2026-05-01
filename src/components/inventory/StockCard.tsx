import Image from 'next/image'
import Link from 'next/link'
import type { StockItem } from '@/src/lib/mock-data'
import { zar } from '@/src/lib/format'

export default function StockCard({ item }: { item: StockItem }) {
  const isInStock = item.status === 'IN_STOCK'

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{ background: '#1A1A1A', border: '1px solid #222222' }}
    >
      {/* Photo */}
      <div className="relative" style={{ height: 160 }}>
        <Image
          src={item.imageUrl}
          alt={item.model}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2" style={{ padding: 16 }}>
        <span className="text-sm font-semibold text-white">{item.model}</span>
        <span className="text-xs" style={{ color: '#888888' }}>
          {item.storage} · {item.color} · {item.grade}
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
