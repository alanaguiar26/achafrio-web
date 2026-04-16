'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BadgeCheck, LayoutDashboard, LogOut, Menu, Search, Snowflake, X } from 'lucide-react'
import { logout } from '@/lib/client-auth'
import { useSession } from '@/lib/use-session'

const publicLinks = [
  { href: '/buscar', label: 'Buscar' },
  { href: '/planos', label: 'Planos' },
  { href: '/cadastro', label: 'Cadastrar meu perfil' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, isAdmin, loading } = useSession()

  async function handleLogout() {
    await logout()
    window.location.href = '/login'
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-slate-950/72 backdrop-blur-xl">
      <div className="container-app flex min-h-[78px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/20 via-sky-400/12 to-violet-400/18 text-cyan-100 shadow-[0_14px_40px_rgba(35,188,255,0.16)]">
            <Snowflake className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[1.34rem] font-black tracking-[-0.03em] text-white">AchaFrio</div>
            <div className="text-[0.77rem] text-slate-400">Profissionais de climatização com presença premium</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {publicLinks.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
          {loading ? (
            <div className="text-sm text-slate-500">Carregando…</div>
          ) : isAuthenticated ? (
            <>
              {isAdmin ? <Link href="/admin" className="nav-link">Admin</Link> : null}
              <Link href="/dashboard" className="btn-primary text-sm"><LayoutDashboard className="h-4 w-4" />Painel</Link>
              <button onClick={handleLogout} className="btn-secondary cursor-pointer text-sm"><LogOut className="h-4 w-4" />Sair</button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">Entrar</Link>
              <Link href="/cadastro" className="btn-primary text-sm"><BadgeCheck className="h-4 w-4" />Criar conta</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/buscar" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-slate-100">
            <Search className="h-4 w-4" />
          </Link>
          <button onClick={() => setOpen((prev) => !prev)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-slate-100">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/8 bg-slate-950/94 lg:hidden">
          <div className="container-app grid gap-2 py-4">
            {publicLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-100 hover:bg-white/5">
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {isAdmin ? <Link href="/admin" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-100 hover:bg-white/5">Admin</Link> : null}
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-100 hover:bg-white/5">Painel</Link>
                <button onClick={handleLogout} className="rounded-2xl px-4 py-3 text-left text-sm text-slate-100 hover:bg-white/5">Sair</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-100 hover:bg-white/5">Entrar</Link>
                <Link href="/cadastro" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-100 hover:bg-white/5">Criar conta</Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
