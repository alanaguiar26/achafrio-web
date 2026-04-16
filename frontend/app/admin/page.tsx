'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/client-auth'

interface AdminDashboard {
  users: number
  profiles: number
  quotes: number
  reviewsPending: number
  verificationsPending: number
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
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null)
  const [verifications, setVerifications] = useState<VerificationRow[]>([])
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [error, setError] = useState<string | null>(null)

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
    load()
  }, [])

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

  return (
    <div className="container-app py-12">
      <div className="grid gap-6">
        <section className="glass rounded-[30px] border p-7">
          <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Painel administrativo</div>
          <h1 className="mt-3 text-3xl font-black text-white">Fila de operação do AchaFrio.</h1>
          {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
          <div className="mt-6 grid gap-5 md:grid-cols-5">
            {dashboard ? [
              ['Usuários', dashboard.users],
              ['Perfis', dashboard.profiles],
              ['Orçamentos', dashboard.quotes],
              ['Reviews pendentes', dashboard.reviewsPending],
              ['Verificações pendentes', dashboard.verificationsPending],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="mt-2 text-sm text-slate-400">{label}</div>
              </div>
            )) : <div className="text-sm text-slate-300">Carregando...</div>}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-[30px] border p-7">
            <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Verificações</div>
            <div className="mt-5 grid gap-4">
              {verifications.length ? verifications.map((row) => (
                <div key={row.id} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                  <div className="font-black text-white">{row.profile.name}</div>
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
            <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Moderação de avaliações</div>
            <div className="mt-5 grid gap-4">
              {reviews.length ? reviews.map((row) => (
                <div key={row.id} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                  <div className="font-black text-white">{row.reviewerName}</div>
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
