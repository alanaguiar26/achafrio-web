import Link from 'next/link'
import { BadgeCheck, Menu, Search, Snowflake } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-slate-950/70 backdrop-blur-xl">
      <div className="container-app flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-200"><Snowflake className="h-5 w-5" /></div>
          <div>
            <div className="text-lg font-black tracking-tight text-white">AchaFrio</div>
            <div className="text-xs text-slate-400">Técnicos e empresas em todo o Brasil</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
          <Link href="/buscar">Buscar</Link>
          <Link href="/planos">Planos</Link>
          <Link href="/cadastro">Cadastrar meu perfil</Link>
          <Link href="/login">Entrar</Link>
          <Link href="/dashboard" className="btn-primary text-sm"><BadgeCheck className="h-4 w-4" />Painel</Link>
        </nav>
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/buscar" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200"><Search className="h-4 w-4" /></Link>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200"><Menu className="h-4 w-4" /></button>
        </div>
      </div>
    </header>
  )
}
