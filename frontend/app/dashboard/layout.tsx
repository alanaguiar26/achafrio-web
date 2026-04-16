import type { ReactNode } from 'react'
import { DashboardNav } from '@/components/dashboard/nav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container-app py-10 md:py-12">
      <div className="grid gap-6 xl:grid-cols-[286px_1fr]">
        <DashboardNav />
        <div>{children}</div>
      </div>
    </div>
  )
}
