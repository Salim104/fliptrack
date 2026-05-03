'use client'

import { Bell } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

interface TopBarProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export default function TopBar({ title, subtitle, action }: TopBarProps) {
  const { user } = useUser()
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join('') || '?'
  return (
    <div className="flex items-center justify-between w-full" style={{ padding: '0 0 24px 0' }}>
      {/* Left */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
        )}
      </div>

      {/* Right — custom action or default bell + avatar */}
      {action ? (
        <div className="flex items-center">{action}</div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center rounded-lg"
            style={{ width: 40, height: 40, background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            aria-label="Notifications"
          >
            <Bell size={18} color="var(--text-muted)" />
          </button>
          <div
            className="flex items-center justify-center rounded-full text-white text-sm font-semibold"
            style={{ width: 40, height: 40, background: 'var(--accent-dark)' }}
          >
            {initials}
          </div>
        </div>
      )}
    </div>
  )
}
