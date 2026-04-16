'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BadgeCheck, CircleOff, ShieldCheck, Star, Users } from 'lucide-react'
import { apiClient } from '@/lib/client-auth'
import { EmptyState } from '@/components/ui'

interface AdminDashboard {
  totals: {
    users: number
    publicProfiles: number
    quotes: number
    reviewsPending: number
    verificationsPending: number
  }
  recentUsers: Array<{ id: string; email: string; role: string; createdAt: string; profile?: { name: string } | null }>
  recentProfiles: Array<{ id: string; name: string; slug: string; city: string; state: string; plan: string; verified: boolean; featured: boolean; active: boolean; user: { email: string } }>
  recentQuotes: Array<{ id: string; clientName: string; clientCity: string; clientState: string; status: string; createdAt: string; profile: { name: string; plan: string } }>
}

interface VerificationRow { id: string; status: 'PENDING' | 'APPROVED' | 'REJECTED'; profile: { name: string; slug: string } }
interface ReviewRow { id: string; reviewerName: string; rating: number; status: 'PENDING' | 'APPROVED' | 'REJECTED'; profile: { name: string } }

export default function AdminPage() {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null)
  const [verifications, setVerifications] = useState<VerificationRow[]>([])
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [savingProfileId, setSavingProfileId] = useState<string | null>(null)

  function loadAll() {
    Promise.all([
      apiClient<AdminDashboard>('/admin/dashboard', undefined, true),
      apiClient<VerificationRow[]>('/admin/verifications', undefined, true),
      apiClient<ReviewRow[]>('/admin/reviews', undefined, true),
    ]).then(([dashboardData, verificationData, reviewData]) => {
      setDashboard(dashboardData)
      setVerifications(verificationData)
      setReviews(reviewData)
    })
  }

  useEffect(() => {
    loadAll()
  }, [])

  async function updateProfile(id: string, payload: { featured?: boolean; active?: boolean }) {
    setSavingProfileId(id)
    try {
      await apiClient(`/admin/profiles/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }, true)
      loadAll()
    } finally {
      setSavingProfileId(null)
    }
  }

  async function reviewVerification(id: string, status: 'APPROVED' | 'REJECTED') {
    await apiClient(`/admin/verifications/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }, true)
    loadAll()
  }

  async function moderateReview(id: string, status: 'APPROVED' | 'REJECTED') {
    await apiClient(`/admin/reviews/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }, true)
    loadAll()
  }

  return (
    <div className="container-app py-10 md:py-12">
      <div className="grid gap-6">
        <section className="glass rounded-[34px] border p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="eyebrow">Operação</div>
              <h1 className="section-title-sm mt-4">Painel administrativo com visão mais clara da operação.</h1>
              <p className="section-subtitle mt-4">Monitore fila de moderação, perfis recentes, últimos usuários, orçamentos e ações rápidas sem depender de consultas manuais no banco.</p>
            </div>
            <Link href="/buscar" className="btn-secondary">Ver busca pública</Link>
          </div>

          <div className="mt-8 soft-grid-4">
            {dashboard ? [
              ['Usuários', dashboard.totals.users],
              ['Perfis públicos', dashboard.totals.publicProfiles],
              ['Orçamentos', dashboard.totals.quotes],
              ['Avaliações pendentes', dashboard.totals.reviewsPending],
              ['Verificações pendentes', dashboard.totals.verificationsPending],
            ].map(([label, value]) => (
              <div key={String(label)} className="surface-inset p-5">
                <div className="text-4xl font-black tracking-[-0.05em] text-white">{value}</div>
                <div className="mt-2 text-sm text-slate-400">{label}</div>
              </div>
            )) : <div className="text-sm text-slate-300">Carregando…</div>}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="glass rounded-[32px] border p-6 md:p-7">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200"><Users className="h-4 w-4" />Últimos usuários</div>
            <div className="mt-5 overflow-hidden rounded-[24px] border border-white/8 bg-slate-950/35">
              <div className="hidden grid-cols-[1.15fr_0.9fr_0.6fr] gap-4 border-b border-white/8 px-5 py-3 text-xs uppercase tracking-[0.14em] text-slate-500 md:grid">
                <div>Email</div><div>Perfil</div><div>Role</div>
              </div>
              <div className="divide-y divide-white/8">
                {dashboard?.recentUsers?.map((user) => (
                  <div key={user.id} className="grid gap-1 px-5 py-4 md:grid-cols-[1.15fr_0.9fr_0.6fr] md:items-center md:gap-4">
                    <div>
                      <div className="text-sm text-white">{user.email}</div>
                      <div className="text-xs text-slate-500">{new Date(user.createdAt).toLocaleString('pt-BR')}</div>
                    </div>
                    <div className="text-sm text-slate-300">{user.profile?.name ?? 'Sem perfil'}</div>
                    <div className="text-sm text-slate-400">{user.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-[32px] border p-6 md:p-7">
            <div className="eyebrow">Últimos orçamentos</div>
            <div className="mt-5 grid gap-4">
              {dashboard?.recentQuotes?.length ? dashboard.recentQuotes.map((quote) => (
                <div key={quote.id} className="surface-inset p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-semibold text-white">{quote.clientName}</div>
                    <div className="text-xs text-slate-500">{new Date(quote.createdAt).toLocaleString('pt-BR')}</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-400">{quote.clientCity}/{quote.clientState} • {quote.status}</div>
                  <div className="mt-2 text-sm text-slate-300">Perfil: {quote.profile.name} ({quote.profile.plan})</div>
                </div>
              )) : <EmptyState title="Sem orçamentos recentes" description="Quando os primeiros leads entrarem, eles aparecerão aqui para acompanhamento rápido." className="p-5" />}
            </div>
          </div>
        </section>

        <section className="glass rounded-[32px] border p-6 md:p-7">
          <div className="eyebrow">Perfis recentes</div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {dashboard?.recentProfiles?.map((profile) => (
              <div key={profile.id} className="surface-inset p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white">{profile.name}</div>
                    <div className="mt-1 text-sm text-slate-400">/{profile.slug} • {profile.city}/{profile.state}</div>
                    <div className="mt-1 text-xs text-slate-500">{profile.user.email}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge bg-cyan-500/12 text-cyan-100">{profile.plan}</span>
                    {profile.verified ? <span className="badge bg-emerald-500/12 text-emerald-200"><ShieldCheck className="h-4 w-4" />Verificado</span> : null}
                    {profile.featured ? <span className="badge bg-amber-500/12 text-amber-200"><Star className="h-4 w-4" />Destaque</span> : null}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button disabled={savingProfileId === profile.id} onClick={() => updateProfile(profile.id, { featured: !profile.featured })} className="btn-secondary cursor-pointer text-sm disabled:opacity-60">
                    {profile.featured ? 'Remover destaque' : 'Destacar perfil'}
                  </button>
                  <button disabled={savingProfileId === profile.id} onClick={() => updateProfile(profile.id, { active: !profile.active })} className="btn-secondary cursor-pointer text-sm disabled:opacity-60">
                    {profile.active ? <><CircleOff className="h-4 w-4" />Desativar</> : <><BadgeCheck className="h-4 w-4" />Reativar</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-[32px] border p-6 md:p-7">
            <div className="eyebrow">Fila de verificações</div>
            <div className="mt-5 grid gap-4">
              {verifications.length ? verifications.map((row) => (
                <div key={row.id} className="surface-inset p-5">
                  <div className="font-semibold text-white">{row.profile.name}</div>
                  <div className="mt-1 text-sm text-slate-400">/{row.profile.slug} • {row.status}</div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => reviewVerification(row.id, 'APPROVED')} className="btn-primary cursor-pointer text-sm">Aprovar</button>
                    <button onClick={() => reviewVerification(row.id, 'REJECTED')} className="btn-secondary cursor-pointer text-sm">Rejeitar</button>
                  </div>
                </div>
              )) : <EmptyState title="Sem verificações agora" description="Quando um profissional solicitar análise de documento, a fila aparece aqui." className="p-5" />}
            </div>
          </div>

          <div className="glass rounded-[32px] border p-6 md:p-7">
            <div className="eyebrow">Moderação de avaliações</div>
            <div className="mt-5 grid gap-4">
              {reviews.length ? reviews.map((row) => (
                <div key={row.id} className="surface-inset p-5">
                  <div className="font-semibold text-white">{row.reviewerName}</div>
                  <div className="mt-1 text-sm text-slate-400">Perfil: {row.profile.name} • {row.status}</div>
                  <div className="mt-2 text-sm text-yellow-300">{'★'.repeat(row.rating)}</div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => moderateReview(row.id, 'APPROVED')} className="btn-primary cursor-pointer text-sm">Aprovar</button>
                    <button onClick={() => moderateReview(row.id, 'REJECTED')} className="btn-secondary cursor-pointer text-sm">Rejeitar</button>
                  </div>
                </div>
              )) : <EmptyState title="Sem avaliações para moderar" description="As próximas avaliações pendentes vão aparecer aqui para aprovação ou rejeição." className="p-5" />}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
