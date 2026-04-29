export const metrics = {
  totalStock: 124,
  totalStockDelta: '+12 this week',
  unitsSold: 87,
  unitsSoldDelta: '+5 today',
  revenue: 348500,
  revenueDelta: '+R42K this month',
  profit: 89200,
  profitMargin: '25.6% margin',
}

export const recentSales = [
  { id: '1', buyerName: 'Sipho M.',  phone: 'iPhone 14 Pro 128GB', salePrice: 8500,  costPrice: 7300,  date: '28 Apr 2026' },
  { id: '2', buyerName: 'Thabo K.',  phone: 'iPhone 13 64GB',      salePrice: 5800,  costPrice: 4900,  date: '27 Apr 2026' },
  { id: '3', buyerName: 'Lerato N.', phone: 'iPhone 15 256GB',     salePrice: 14200, costPrice: 11400, date: '26 Apr 2026' },
  { id: '4', buyerName: 'James M.',  phone: 'iPhone 12 128GB',     salePrice: 4500,  costPrice: 3850,  date: '25 Apr 2026' },
  { id: '5', buyerName: 'Nomsa D.',  phone: 'iPhone 14 128GB',     salePrice: 7200,  costPrice: 6100,  date: '24 Apr 2026' },
]

export type StockStatus = 'IN_STOCK' | 'SOLD'

export interface StockItem {
  id: string
  model: string
  storage: string
  color: string
  grade: string
  costPrice: number
  status: StockStatus
  imageUrl: string
}

export interface SaleRecord {
  id: string
  date: string
  phone: string
  buyer: string
  salePrice: number
  costPrice: number
}

export const salesHistory: SaleRecord[] = [
  { id: '1', date: '28 Apr 2026', phone: 'iPhone 15 Pro 256GB',    buyer: 'Sipho Ndlovu',    salePrice: 8500, costPrice: 6400 },
  { id: '2', date: '27 Apr 2026', phone: 'iPhone 13 128GB',         buyer: 'Lerato Molefe',   salePrice: 4200, costPrice: 3150 },
  { id: '3', date: '25 Apr 2026', phone: 'iPhone 14 Pro Max 256GB', buyer: 'Thabo Mahlangu',  salePrice: 7800, costPrice: 5200 },
  { id: '4', date: '23 Apr 2026', phone: 'iPhone 12 64GB',          buyer: 'Nomsa Dlamini',   salePrice: 3100, costPrice: 2250 },
  { id: '5', date: '21 Apr 2026', phone: 'iPhone 15 128GB',         buyer: 'Bongani Mthembu', salePrice: 6900, costPrice: 5100 },
  { id: '6', date: '19 Apr 2026', phone: 'iPhone 14 128GB',         buyer: 'Zanele Khumalo',  salePrice: 5400, costPrice: 4000 },
  { id: '7', date: '17 Apr 2026', phone: 'iPhone 11 64GB',          buyer: 'Mandla Sithole',  salePrice: 2300, costPrice: 1700 },
]

export const stockItems: StockItem[] = [
  {
    id: '1',
    model: 'iPhone 14 Pro',
    storage: '128GB',
    color: 'Space Black',
    grade: 'Grade A',
    costPrice: 7300,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1693748096733-962d7cc21fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  },
  {
    id: '2',
    model: 'iPhone 13',
    storage: '64GB',
    color: 'Blue',
    grade: 'Grade B',
    costPrice: 4900,
    status: 'SOLD',
    imageUrl: 'https://images.unsplash.com/photo-1632667895619-41884dfda500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  },
  {
    id: '3',
    model: 'iPhone 15',
    storage: '256GB',
    color: 'Natural',
    grade: 'Grade A',
    costPrice: 11400,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1697630725330-d4f458260399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  },
  {
    id: '4',
    model: 'iPhone 12 Mini',
    storage: '64GB',
    color: 'Red',
    grade: 'Grade C',
    costPrice: 3200,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1743677221330-9886caa74fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  },
  {
    id: '5',
    model: 'iPhone SE 2022',
    storage: '128GB',
    color: 'Starlight',
    grade: 'Grade A',
    costPrice: 4100,
    status: 'SOLD',
    imageUrl: 'https://images.unsplash.com/photo-1560141550-d9fb595082ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  },
  {
    id: '6',
    model: 'iPhone 14',
    storage: '128GB',
    color: 'Purple',
    grade: 'Grade B',
    costPrice: 6100,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1695048132783-4b9f77bde5be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  },
  {
    id: '7',
    model: 'iPhone 11',
    storage: '64GB',
    color: 'White',
    grade: 'Grade B',
    costPrice: 2800,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1585513827509-4ab827d891b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  },
  {
    id: '8',
    model: 'iPhone 15 Pro Max',
    storage: '512GB',
    color: 'Natural',
    grade: 'Grade A',
    costPrice: 18500,
    status: 'IN_STOCK',
    imageUrl: 'https://images.unsplash.com/photo-1760074016472-029d6b082429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800',
  },
]
