'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BadgeCheck, CircleOff, ShieldCheck, Star, Users } from 'lucide-react'
import { apiClient } from '@/lib/client-auth'
import { useSession } from '@/lib/use-session'

interface AdminDashboard {
  users: number
  profiles: number
  quotes: number
  reviewsPending: number
  verificationsPending: number
  recentUsers: Array<{
    id: string
    email: string
    role: 'ADMIN' | 'USER'
    createdAt: string
    profile?: { name: string; slug: string; plan: string; active: boolean; verified: boolean } | null
  }>
  recentProfiles: Array<{
    id: string
    name: string
    slug: string
    city: string
    state: string
    plan: 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM'
    active: boolean
    verified: boolean
    featured: boolean
    createdAt: string
    user: { email: string; role: 'ADMIN' | 'USER' }
  }>
  recentQuotes: Array<{
    id: string
    clientName: string
    clientCity: string
    clientState: string
    status: string
    createdAt: string
    profile: { name: string; slug: string; plan: string }
  }>
}

interface VerificationRow {
  id: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  profile: { name: string; slug: string }
}

interface ReviewRow {
  id: string
  reviewerName: string
  rating: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  profile: { name: string; slug: string }
}

export default function AdminPage() {
  const { isAdmin, loading: authLoading } = useSession()
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null)
  const [verifications, setVerifications] = useState<VerificationRow[]>([])
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [savingProfileId, setSavingProfileId] = useState<string | null>(null)

  function load() {
    Promise.all([
      apiClient<AdminDashboard>('/admin/dashboard', undefined, true),
      apiClient<VerificationRow[]>('/admin/verifications', undefined, true),
      apiClient<ReviewRow[]>('/admin/reviews', undefined, true),
    ])
      .then(([d, v, r]) => {
        setDashboard(d)
        setVerifications(v)
        setReviews(r)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar admin.'))
  }

  useEffect(() => {
    if (isAdmin) load()
  }, [isAdmin])

  async function reviewVerification(id: string, status: 'APPROVED' | 'REJECTED') {
    try {
      await apiClient(`/admin/verifications/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }, true)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao revisar verificação.')
    }
  }

  async function moderateReview(id: string, status: 'APPROVED' | 'REJECTED') {
    try {
      await apiClient(`/admin/reviews/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }, true)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao moderar avaliação.')
    }
  }

  async function updateProfile(profileId: string, payload: { active?: boolean; featured?: boolean }) {
    try {
      setSavingProfileId(profileId)
      await apiClient(`/admin/profiles/${profileId}`, { method: 'PUT', body: JSON.stringify(payload) }, true)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao atualizar perfil.')
    } finally {
      setSavingProfileId(null)
    }
  }

  if (authLoading) {
    return <div className="container-app py-12"><div className="glass rounded-[28px] border p-6 text-sm text-slate-300">Carregando permissões...</div></div>
  }

  if (!isAdmin) {
    return <div className="container-app py-12"><div className="glass rounded-[28px] border p-6 text-sm text-rose-200">Acesso restrito ao admin.</div></div>
  }

  return (
    <div className="container-app py-12">
      <div className="grid gap-6">
        <section className="glass rounded-[30px] border p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Operação</div>
              <h1 className="mt-3 text-3xl font-semibold text-white">Painel administrativo</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Agora o admin tem uma visão mais útil: fila de moderação, últimos cadastros, últimos perfis, últimos leads e ações rápidas para destacar ou desativar perfis.</p>
            </div>
            <Link href="/buscar" className="btn-secondary text-sm">Ver busca pública</Link>
          </div>
          {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {dashboard ? [
              ['Usuários', dashboard.users],
              ['Perfis públicos', dashboard.profiles],
              ['Orçamentos', dashboard.quotes],
              ['Avaliações pendentes', dashboard.reviewsPending],
              ['Verificações pendentes', dashboard.verificationsPending],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                <div className="text-3xl font-semibold text-white">{value}</div>
                <div className="mt-2 text-sm text-slate-400">{label}</div>
              </div>
            )) : <div className="text-sm text-slate-300">Carregando...</div>}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="glass rounded-[30px] border p-7">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200"><Users className="h-4 w-4" />Últimos usuários</div>
            <div className="mt-5 overflow-hidden rounded-[24px] border border-white/8 bg-slate-950/35">
              <div className="hidden grid-cols-[1.2fr_1fr_0.7fr] gap-4 border-b border-white/8 px-5 py-3 text-xs uppercase tracking-[0.14em] text-slate-500 md:grid">
                <div>Email</div><div>Perfil</div><div>Role</div>
              </div>
              <div className="divide-y divide-white/8">
                {dashboard?.recentUsers?.map((user) => (
                  <div key={user.id} className="grid gap-1 px-5 py-4 md:grid-cols-[1.2fr_1fr_0.7fr] md:items-center md:gap-4">
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

          <div className="glass rounded-[30px] border p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Últimos orçamentos</div>
            <div className="mt-5 grid gap-4">
              {dashboard?.recentQuotes?.length ? dashboard.recentQuotes.map((quote) => (
                <div key={quote.id} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-semibold text-white">{quote.clientName}</div>
                    <div className="text-xs text-slate-500">{new Date(quote.createdAt).toLocaleString('pt-BR')}</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-400">{quote.clientCity}/{quote.clientState} • {quote.status}</div>
                  <div className="mt-2 text-sm text-slate-300">Perfil: {quote.profile.name} ({quote.profile.plan})</div>
                </div>
              )) : <div className="rounded-[24px] border border-dashed border-white/10 p-5 text-sm text-slate-400">Sem orçamentos recentes.</div>}
            </div>
          </div>
        </section>

        <section className="glass rounded-[30px] border p-7">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Perfis recentes</div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {dashboard?.recentProfiles?.map((profile) => (
              <div key={profile.id} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white">{profile.name}</div>
                    <div className="mt-1 text-sm text-slate-400">/{profile.slug} • {profile.city}/{profile.state}</div>
                    <div className="mt-1 text-xs text-slate-500">{profile.user.email}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge bg-cyan-500/10 text-cyan-100">{profile.plan}</span>
                    {profile.verified ? <span className="badge bg-emerald-500/12 text-emerald-300"><ShieldCheck className="h-4 w-4" />Verificado</span> : null}
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
          <div className="glass rounded-[30px] border p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Fila de verificações</div>
            <div className="mt-5 grid gap-4">
              {verifications.length ? verifications.map((row) => (
                <div key={row.id} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                  <div className="font-semibold text-white">{row.profile.name}</div>
                  <div className="mt-1 text-sm text-slate-400">/{row.profile.slug} • {row.status}</div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => reviewVerification(row.id, 'APPROVED')} className="btn-primary cursor-pointer text-sm">Aprovar</button>
                    <button onClick={() => reviewVerification(row.id, 'REJECTED')} className="btn-secondary cursor-pointer text-sm">Rejeitar</button>
                  </div>
                </div>
              )) : <div className="rounded-[24px] border border-dashed border-white/10 p-5 text-sm text-slate-400">Sem verificações no momento.</div>}
            </div>
          </div>

          <div className="glass rounded-[30px] border p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Moderação de avaliações</div>
            <div className="mt-5 grid gap-4">
              {reviews.length ? reviews.map((row) => (
                <div key={row.id} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                  <div className="font-semibold text-white">{row.reviewerName}</div>
                  <div className="mt-1 text-sm text-slate-400">Perfil: {row.profile.name} • {row.status}</div>
                  <div className="mt-1 text-sm text-yellow-300">{'★'.repeat(row.rating)}</div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => moderateReview(row.id, 'APPROVED')} className="btn-primary cursor-pointer text-sm">Aprovar</button>
                    <button onClick={() => moderateReview(row.id, 'REJECTED')} className="btn-secondary cursor-pointer text-sm">Rejeitar</button>
                  </div>
                </div>
              )) : <div className="rounded-[24px] border border-dashed border-white/10 p-5 text-sm text-slate-400">Sem avaliações para moderar.</div>}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
