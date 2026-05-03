'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Smartphone } from 'lucide-react'
import { navItems } from '@/src/lib/nav'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden lg:flex flex-col gap-8 fixed left-0 top-0 h-full w-60 z-40"
      style={{ background: 'var(--bg-sunken)', borderRight: '1px solid var(--border)', padding: '24px 16px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 pl-1">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 32, height: 32, background: 'var(--accent-dark)' }}
        >
          <Smartphone size={18} color="var(--accent)" />
        </div>
        <span className="text-white font-extrabold text-lg">FlipTrack</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 w-full">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 w-full transition-colors"
              style={
                active
                  ? { background: 'var(--accent-dark)', color: 'var(--foreground)', fontWeight: 600 }
                  : { color: 'var(--text-muted)', fontWeight: 500 }
              }
            >
              <Icon size={20} color={active ? 'var(--accent)' : 'var(--text-muted)'} />
              <span className="text-sm">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
