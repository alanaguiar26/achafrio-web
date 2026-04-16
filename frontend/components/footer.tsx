import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, MapPinned, MessageSquareText } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/6 bg-slate-950/72">
      <div className="container-app py-10 md:py-14">
        <div className="glass mb-8 rounded-[30px] border bg-gradient-to-r from-cyan-500/12 via-white/[0.03] to-orange-400/12 p-6 md:flex md:items-center md:justify-between md:gap-6 md:p-8">
          <div>
            <div className="eyebrow">Pronto para crescer</div>
            <h2 className="section-title-sm mt-4 max-w-2xl">Dê ao seu perfil um visual mais confiável e transforme visitas em contato.</h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:justify-end">
            <Link href="/cadastro" className="btn-primary">Criar meu perfil <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="/planos" className="btn-secondary">Ver planos</Link>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <div className="text-2xl font-black tracking-[-0.04em] text-white">AchaFrio</div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Plataforma para técnicos e empresas de ar-condicionado e refrigeração conquistarem mais visibilidade, mais confiança e mais oportunidades reais.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="meta-chip"><BadgeCheck className="h-4 w-4" />Perfis verificados</span>
              <span className="meta-chip"><MapPinned className="h-4 w-4" />Busca por cidade e UF</span>
              <span className="meta-chip"><MessageSquareText className="h-4 w-4" />Leads no painel</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Navegação</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-400">
              <Link href="/">Home</Link>
              <Link href="/buscar">Buscar</Link>
              <Link href="/planos">Planos</Link>
              <Link href="/cadastro">Cadastro</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">Para o profissional</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-400">
              <span>Perfil público otimizado</span>
              <span>Solicitação de avaliações</span>
              <span>Verificação de perfil</span>
              <span>Assinaturas recorrentes</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-amber-200">Comercial</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-400">
              <span>Contato visível nos planos pagos</span>
              <span>Ranking por plano e reputação</span>
              <span>Orçamentos em PRO e PREMIUM</span>
              <span>Integração com Asaas e n8n</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
