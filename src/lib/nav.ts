import { LayoutDashboard, Package, CirclePlus, ShoppingCart, FileText } from 'lucide-react'

export const navItems = [
  { label: 'Dashboard',     shortLabel: 'Home',      href: '/',              icon: LayoutDashboard },
  { label: 'Inventory',     shortLabel: 'Inventory', href: '/inventory',     icon: Package },
  { label: 'Add Stock',     shortLabel: 'Add',       href: '/add-stock',     icon: CirclePlus },
  { label: 'Sell',          shortLabel: 'Sell',      href: '/sell',          icon: ShoppingCart },
  { label: 'Sales History', shortLabel: 'Sales',     href: '/sales-history', icon: FileText },
]
