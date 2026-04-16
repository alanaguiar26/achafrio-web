'use client'

import { FormEvent, useEffect, useState } from 'react'
import { apiClient } from '@/lib/client-auth'

interface ReviewItem {
  id: string
  reviewerName: string
  rating: number
  comment?: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export default function DashboardAvaliacoesPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [form, setForm] = useState({ clientName: '', clientContact: '', channel: 'WHATSAPP' as 'WHATSAPP' | 'EMAIL' })
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function loadReviews() {
    apiClient<ReviewItem[]>('/reviews/me', undefined, true)
      .then(setReviews)
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar avaliações.'))
  }

  useEffect(() => {
    loadReviews()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)

    try {
      const response = await apiClient<{ link: string }>('/reviews/request', {
        method: 'POST',
        body: JSON.stringify(form),
      }, true)
      setMessage(`Solicitação criada. Link único: ${response.link}`)
      setForm({ clientName: '', clientContact: '', channel: 'WHATSAPP' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao solicitar avaliação.')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <form onSubmit={handleSubmit} className="glass rounded-[30px] border p-7">
        <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Solicitar avaliação</div>
        <h1 className="mt-3 text-3xl font-black text-white">Peça feedback real por WhatsApp ou email.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">O backend gera um token único com expiração em 7 dias e dispara o evento transacional para o n8n, que por sua vez envia via Evolution ou email.</p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-slate-200">
            Nome do cliente
            <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={form.clientName} onChange={(event) => setForm((prev) => ({ ...prev, clientName: event.target.value }))} required />
          </label>
          <label className="grid gap-2 text-sm text-slate-200">
            Contato do cliente
            <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={form.clientContact} onChange={(event) => setForm((prev) => ({ ...prev, clientContact: event.target.value }))} required placeholder="WhatsApp ou email" />
          </label>
          <label className="grid gap-2 text-sm text-slate-200">
            Canal
            <select className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={form.channel} onChange={(event) => setForm((prev) => ({ ...prev, channel: event.target.value as 'WHATSAPP' | 'EMAIL' }))}>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="EMAIL">Email</option>
            </select>
          </label>
        </div>

        {message ? <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
        {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

        <button className="btn-primary mt-6 cursor-pointer">Gerar link e disparar</button>
      </form>

      <div className="glass rounded-[30px] border p-7">
        <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Avaliações do perfil</div>
        <div className="mt-5 grid gap-4">
          {reviews.length ? reviews.map((review) => (
            <div key={review.id} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-black text-white">{review.reviewerName}</div>
                  <div className="mt-1 text-sm text-yellow-300">{'★'.repeat(review.rating)}</div>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-cyan-100">{review.status}</div>
              </div>
              {review.comment ? <p className="mt-3 text-sm leading-7 text-slate-300">{review.comment}</p> : null}
            </div>
          )) : <div className="rounded-[24px] border border-dashed border-white/10 p-5 text-sm text-slate-400">Nenhuma avaliação cadastrada ainda.</div>}
        </div>
      </div>
    </div>
  )
}
