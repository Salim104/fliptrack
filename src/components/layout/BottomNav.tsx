'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  CirclePlus,
  ShoppingCart,
  FileText,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',  href: '/',              icon: LayoutDashboard },
  { label: 'Inventory',  href: '/inventory',     icon: Package },
  { label: 'Add Stock',  href: '/add-stock',     icon: CirclePlus },
  { label: 'Sell',       href: '/sell',          icon: ShoppingCart },
  { label: 'Sales',      href: '/sales-history', icon: FileText },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="flex lg:hidden fixed bottom-0 left-0 right-0 z-50 w-full"
      style={{ background: '#111111', borderTop: '1px solid #222222' }}
    >
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-3"
          >
            <Icon size={22} color={active ? '#00FF88' : '#888888'} />
            <span
              className="text-[10px] font-medium"
              style={{ color: active ? '#00FF88' : '#888888' }}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
