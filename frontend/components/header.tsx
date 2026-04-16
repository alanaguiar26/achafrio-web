'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BadgeCheck, LayoutDashboard, LogOut, Menu, Search, Snowflake, X } from 'lucide-react'
import { logout } from '@/lib/client-auth'
import { useSession } from '@/lib/use-session'

const publicLinks = [
  { href: '/buscar', label: 'Buscar' },
  { href: '/planos', label: 'Planos' },
]

export function Header() {
  const { isAuthenticated, isAdmin, loading } = useSession()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await logout()
    setOpen(false)
    window.location.href = '/login'
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-slate-950/72 backdrop-blur-xl">
      <div className="container-app flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/12 bg-cyan-500/10 text-cyan-200"><Snowflake className="h-5 w-5" /></div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-white">AchaFrio</div>
            <div className="text-xs text-slate-400">Técnicos e empresas em todo o Brasil</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          {publicLinks.map((item) => <Link key={item.href} href={item.href} className="hover:text-white transition">{item.label}</Link>)}
          <Link href="/cadastro" className="hover:text-white transition">Cadastrar meu perfil</Link>

          {loading ? <div className="text-slate-500">Carregando...</div> : isAuthenticated ? (
            <>
              {isAdmin ? <Link href="/admin" className="hover:text-white transition">Admin</Link> : null}
              <Link href="/dashboard" className="btn-primary text-sm"><LayoutDashboard className="h-4 w-4" />Painel</Link>
              <button onClick={handleLogout} className="btn-secondary cursor-pointer text-sm"><LogOut className="h-4 w-4" />Sair</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-white transition">Entrar</Link>
              <Link href="/dashboard" className="btn-primary text-sm"><BadgeCheck className="h-4 w-4" />Painel</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/buscar" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200"><Search className="h-4 w-4" /></Link>
          <button onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/8 bg-slate-950/95 lg:hidden">
          <div className="container-app grid gap-2 py-4">
            {publicLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">{item.label}</Link>
            ))}
            <Link href="/cadastro" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Cadastrar meu perfil</Link>

            {isAuthenticated ? (
              <>
                {isAdmin ? <Link href="/admin" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Admin</Link> : null}
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Painel</Link>
                <button onClick={handleLogout} className="rounded-2xl px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5">Sair</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Entrar</Link>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Painel</Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
