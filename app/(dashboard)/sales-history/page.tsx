import { prisma } from '@/src/lib/db'
import TopBar from '@/src/components/layout/TopBar'
import SummaryCards from '@/src/components/sales/SummaryCards'
import SalesTable from '@/src/components/sales/SalesTable'
import ExportCSVButton from '@/src/components/sales/ExportCSVButton'

export default async function SalesHistoryPage() {
  const sales = await prisma.sale.findMany({
    orderBy: { createdAt: 'desc' },
    include: { stockItem: true },
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <TopBar
        title="Sales History"
        subtitle="Full record of all completed sales"
        action={<ExportCSVButton sales={sales} />}
      />
      <SummaryCards sales={sales} />
      <SalesTable sales={sales} />
    </div>
  )
}
