'use client'

import Link from 'next/link'
import { ArrowRight, BadgeCheck, CreditCard, Eye, MessageSquare, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/client-auth'
import { useSession } from '@/lib/use-session'
import { EmptyState } from '@/components/ui'

interface DashboardData {
  profile: { name: string; city: string; state: string; plan: 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM'; verified: boolean; slug: string }
  viewsCount: number
  reviewsCount: number
  averageRating: number
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_SENT'
  activeSubscription: null | { status: string; plan: string }
  quotesCount: number
}

export default function DashboardPage() {
  const { user } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    apiClient<DashboardData>('/profiles/me/dashboard', undefined, true).then(setData).catch(() => setData(null))
  }, [])

  return (
    <div className="dashboard-shell">
      <div className="glass rounded-[34px] border p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">Painel principal</div>
            <h1 className="section-title-sm mt-4">Olá, {user?.profile?.name || data?.profile.name || 'profissional'}.</h1>
            <p className="section-subtitle mt-4">
              Seu perfil está em <strong className="text-white">{data?.profile.city || '—'}/{data?.profile.state || '—'}</strong>, no plano <strong className="text-white">{data?.profile.plan || 'FREE'}</strong>. Aqui você acompanha reputação, assinatura e próximos passos do seu crescimento.
            </p>
          </div>
          {data?.profile.slug ? <Link href={`/perfil/${data.profile.slug}`} className="btn-primary">Ver página pública <ArrowRight className="h-4 w-4" /></Link> : null}
        </div>
      </div>

      <div className="stats-row">
        <div className="glass rounded-[28px] border p-5"><Eye className="h-5 w-5 text-cyan-200" /><div className="mt-4 text-4xl font-black tracking-[-0.05em] text-white">{data?.viewsCount ?? 0}</div><div className="mt-2 text-sm text-slate-400">Visualizações</div></div>
        <div className="glass rounded-[28px] border p-5"><MessageSquare className="h-5 w-5 text-violet-200" /><div className="mt-4 text-4xl font-black tracking-[-0.05em] text-white">{data ? `${data.averageRating.toFixed(1)} / 5` : '0 / 5'}</div><div className="mt-2 text-sm text-slate-400">Avaliações • {data?.reviewsCount ?? 0} recebidas</div></div>
        <div className="glass rounded-[28px] border p-5"><ShieldCheck className="h-5 w-5 text-emerald-200" /><div className="mt-4 text-4xl font-black tracking-[-0.05em] text-white">{data?.verificationStatus === 'APPROVED' ? 'Ativo' : 'Pendente'}</div><div className="mt-2 text-sm text-slate-400">Verificação</div></div>
        <div className="glass rounded-[28px] border p-5"><CreditCard className="h-5 w-5 text-cyan-200" /><div className="mt-4 text-4xl font-black tracking-[-0.05em] text-white">{data?.activeSubscription?.plan || 'Sem'}</div><div className="mt-2 text-sm text-slate-400">Assinatura</div></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-[32px] border p-6 md:p-7">
          <div className="eyebrow">Próximas ações</div>
          <div className="mt-5 grid gap-4">
            {[
              ['Completar perfil', 'Adicione bio, contatos, especialidades e cidades para aparecer melhor na busca.', '/dashboard/perfil'],
              ['Solicitar verificação', 'Envie documento e selfie opcional para aumentar confiança pública.', '/dashboard/verificacao'],
              ['Pedir avaliações', 'Links únicos por WhatsApp ou email ajudam a elevar reputação.', '/dashboard/avaliacoes'],
              ['Subir de plano', 'Mais contato visível, mais ranking e mais chance de gerar orçamento.', '/dashboard/assinatura'],
            ].map(([title, text, href]) => (
              <Link key={title} href={href} className="surface-inset block p-5 transition hover:bg-white/[0.06]">
                <div className="text-base font-semibold text-white">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass rounded-[32px] border p-6 md:p-7">
          <div className="eyebrow">Leads e reputação</div>
          {data ? (
            <div className="mt-5 grid gap-4">
              <div className="surface-inset p-5">
                <div className="text-2xl font-semibold text-white">{data.quotesCount} orçamento(s) novos</div>
                <p className="mt-2 text-sm leading-7 text-slate-400">Planos PRO e PREMIUM usam o recurso de orçamentos como alavanca comercial para aumentar conversão e organizar atendimento.</p>
                <Link href="/dashboard/orcamentos" className="btn-secondary mt-5 text-sm">Abrir inbox de orçamentos</Link>
              </div>

              <div className="surface-inset p-5">
                <div className="flex items-center gap-2 text-white"><BadgeCheck className="h-5 w-5 text-cyan-200" /><div className="text-lg font-semibold">Leitura rápida do seu momento</div></div>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
                  <div>• Plano atual: <strong className="text-white">{data.profile.plan}</strong></div>
                  <div>• Situação da verificação: <strong className="text-white">{data.verificationStatus}</strong></div>
                  <div>• Avaliações recebidas: <strong className="text-white">{data.reviewsCount}</strong></div>
                  <div>• Perfil público: <strong className="text-white">/{data.profile.slug}</strong></div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState title="Carregando painel…" description="Estamos buscando seus indicadores para montar a visão geral do perfil." />
          )}
        </div>
      </div>
    </div>
  )
}
