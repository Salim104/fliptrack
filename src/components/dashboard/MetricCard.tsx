import { type LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  delta: string
  icon: LucideIcon
}

export default function MetricCard({ label, value, delta, icon: Icon }: MetricCardProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-xl"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        padding: 20,
      }}
    >
      {/* Top row: label + icon */}
      <div className="flex items-center justify-between w-full">
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</span>
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 36, height: 36, background: 'var(--accent-dim)' }}
        >
          <Icon size={18} color="var(--accent)" />
        </div>
      </div>

      {/* Value */}
      <span className="font-bold text-white leading-none" style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)' }}>{value}</span>

      {/* Delta */}
      <span className="text-xs" style={{ color: 'var(--accent)' }}>{delta}</span>
    </div>
  )
}
