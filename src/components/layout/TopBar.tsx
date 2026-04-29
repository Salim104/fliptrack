import { Bell } from 'lucide-react'

interface TopBarProps {
  title: string
  subtitle: string
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <div className="flex items-center justify-between w-full" style={{ padding: '0 0 24px 0' }}>
      {/* Left */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm" style={{ color: '#888888' }}>{subtitle}</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 40,
            height: 40,
            background: '#1A1A1A',
            border: '1px solid #222222',
          }}
          aria-label="Notifications"
        >
          <Bell size={18} color="#888888" />
        </button>
        <div
          className="flex items-center justify-center rounded-full text-white text-sm font-semibold"
          style={{ width: 40, height: 40, background: '#1A5C38' }}
        >
          SA
        </div>
      </div>
    </div>
  )
}
