'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart3, CreditCard, FileCheck2, LayoutDashboard, LogOut, MessageSquare, Settings2, Shield } from 'lucide-react'
import { logout } from '@/lib/client-auth'
import { useSession } from '@/lib/use-session'

const baseItems = [
  { href: '/dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { href: '/dashboard/perfil', label: 'Meu perfil', icon: Settings2 },
  { href: '/dashboard/verificacao', label: 'Verificação', icon: Shield },
  { href: '/dashboard/avaliacoes', label: 'Avaliações', icon: MessageSquare },
  { href: '/dashboard/orcamentos', label: 'Orçamentos', icon: FileCheck2 },
  { href: '/dashboard/assinatura', label: 'Assinatura', icon: CreditCard },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAdmin } = useSession()
  const items = isAdmin ? [...baseItems, { href: '/admin', label: 'Admin', icon: BarChart3 }] : baseItems

  return (
    <aside className="glass rounded-[28px] border p-4">
      <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Painel AchaFrio</div>
      <div className="grid gap-2">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                active ? 'border border-cyan-300/18 bg-cyan-500/12 text-white' : 'text-slate-300 hover:bg-white/5',
              ].join(' ')}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
      <button
        onClick={async () => {
          await logout()
          router.push('/login')
        }}
        className="btn-secondary mt-4 w-full cursor-pointer text-sm"
      >
        <LogOut className="h-4 w-4" />
        Sair
      </button>
    </aside>
  )
}
