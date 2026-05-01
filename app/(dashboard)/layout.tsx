import { syncUser } from '@/app/actions/users'
import Sidebar from '@/src/components/layout/Sidebar'
import BottomNav from '@/src/components/layout/BottomNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await syncUser()
  return (
    <div className="flex h-screen" style={{ background: '#0A0A0A' }}>
      <Sidebar />
      <main
        className="flex-1 overflow-y-auto lg:ml-60 pb-16 lg:pb-0"
      >
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
