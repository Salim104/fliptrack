'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Smartphone,
  LayoutDashboard,
  Package,
  CirclePlus,
  ShoppingCart,
  FileText,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',     href: '/',              icon: LayoutDashboard },
  { label: 'Inventory',     href: '/inventory',     icon: Package },
  { label: 'Add Stock',     href: '/add-stock',     icon: CirclePlus },
  { label: 'Sell',          href: '/sell',          icon: ShoppingCart },
  { label: 'Sales History', href: '/sales-history', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden lg:flex flex-col gap-8 fixed left-0 top-0 h-full w-60 z-40"
      style={{ background: '#111111', borderRight: '1px solid #222222', padding: '24px 16px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 pl-1">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 32, height: 32, background: '#1A5C38' }}
        >
          <Smartphone size={18} color="#00FF88" />
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
                  ? { background: '#1A5C38', color: '#FFFFFF', fontWeight: 600 }
                  : { color: '#888888', fontWeight: 500 }
              }
            >
              <Icon size={20} color={active ? '#00FF88' : '#888888'} />
              <span className="text-sm">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
