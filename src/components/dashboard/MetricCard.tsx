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
        background: '#1A1A1A',
        border: '1px solid #222222',
        padding: 20,
      }}
    >
      {/* Top row: label + icon */}
      <div className="flex items-center justify-between w-full">
        <span className="text-sm" style={{ color: '#888888' }}>{label}</span>
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 36, height: 36, background: '#00FF8818' }}
        >
          <Icon size={18} color="#00FF88" />
        </div>
      </div>

      {/* Value */}
      <span className="text-4xl font-bold text-white leading-none">{value}</span>

      {/* Delta */}
      <span className="text-xs" style={{ color: '#00FF88' }}>{delta}</span>
    </div>
  )
}
