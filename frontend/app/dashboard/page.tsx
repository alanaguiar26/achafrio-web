'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, BadgeCheck, CreditCard, Eye, MessageSquare, ShieldCheck } from 'lucide-react'
import { apiClient } from '@/lib/client-auth'

interface DashboardData {
  id: string
  name: string
  slug: string
  city: string
  state: string
  plan: 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM'
  verified: boolean
  viewsCount: number
  reviewsCount: number
  averageRating: number
  quotes: Array<{ id: string; status: string }>
  subscription: null | { status: string; nextDueDate?: string | null }
}

export default function DashboardHomePage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiClient<DashboardData>('/profiles/me', undefined, true)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar painel.'))
  }, [])

  if (error) {
    return <div className="glass rounded-[28px] border p-6 text-sm text-rose-200">{error}</div>
  }

  if (!data) {
    return <div className="glass rounded-[28px] border p-6 text-sm text-slate-300">Carregando painel...</div>
  }

  const pendingQuotes = data.quotes.filter((quote) => quote.status === 'NEW').length

  return (
    <div className="grid gap-6">
      <section className="glass rounded-[30px] border p-7 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Visão geral</div>
            <h1 className="mt-3 text-3xl font-semibold text-white">Olá, {data.name}.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Seu perfil está em <strong>{data.city}/{data.state}</strong>, no plano <strong>{data.plan}</strong>, com {data.viewsCount} visualizações e {data.reviewsCount} avaliações registradas.
            </p>
          </div>
          <Link href={`/perfil/${data.slug}`} className="btn-primary text-sm">
            Ver página pública
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: Eye, label: 'Visualizações', value: String(data.viewsCount), hint: 'Popularidade do perfil' },
          { icon: MessageSquare, label: 'Avaliações', value: `${data.averageRating.toFixed(1)} / 5`, hint: `${data.reviewsCount} recebidas` },
          { icon: ShieldCheck, label: 'Verificação', value: data.verified ? 'Aprovado' : 'Pendente', hint: 'Selo que aumenta confiança' },
          { icon: CreditCard, label: 'Assinatura', value: data.subscription?.status ?? 'Sem assinatura', hint: data.subscription?.nextDueDate ? `Vencimento: ${new Date(data.subscription.nextDueDate).toLocaleDateString('pt-BR')}` : 'Você pode fazer upgrade a qualquer momento' },
        ].map((item) => (
          <div key={item.label} className="glass rounded-[28px] border p-6">
            <item.icon className="h-6 w-6 text-cyan-200" />
            <div className="mt-5 text-3xl font-semibold text-white">{item.value}</div>
            <div className="mt-2 font-semibold text-cyan-100">{item.label}</div>
            <div className="mt-1 text-sm text-slate-400">{item.hint}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
        <div className="glass rounded-[30px] border p-7">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Próximas ações</div>
          <div className="mt-5 grid gap-3">
            {[
              ['Completar perfil', 'Adicione bio, contatos, especialidades e cidades para aparecer melhor na busca.', '/dashboard/perfil'],
              ['Solicitar verificação', 'Envie documento e selfie opcional para conquistar mais confiança.', '/dashboard/verificacao'],
              ['Pedir avaliações', 'Envie links únicos por WhatsApp ou email para fortalecer reputação.', '/dashboard/avaliacoes'],
              ['Subir de plano', 'Liberar contato, galeria, orçamento e melhor ranking.', '/dashboard/assinatura'],
            ].map(([title, text, href]) => (
              <Link key={title} href={href} className="rounded-[24px] border border-white/8 bg-white/4 p-5 transition hover:border-cyan-300/18 hover:bg-cyan-500/7">
                <div className="font-semibold text-white">{title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-400">{text}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass rounded-[30px] border p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Leads</div>
              <div className="mt-2 text-2xl font-semibold text-white">{pendingQuotes} orçamento(s) novos</div>
            </div>
            {data.verified ? <span className="badge bg-emerald-500/14 text-emerald-300"><BadgeCheck className="h-4 w-4" />Perfil verificado</span> : null}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            O recurso de orçamentos é uma alavanca de conversão para planos Pro e Premium. Leads chegam no painel e podem disparar notificação transacional no WhatsApp via n8n + Evolution.
          </p>
          <Link href="/dashboard/orcamentos" className="btn-secondary mt-6 text-sm">Abrir inbox de orçamentos</Link>
        </div>
      </section>
    </div>
  )
}
