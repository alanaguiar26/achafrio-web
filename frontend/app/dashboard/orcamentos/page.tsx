'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/client-auth'

interface QuoteItem {
  id: string
  clientName: string
  clientPhone: string
  clientCity: string
  clientState: string
  serviceType?: string | null
  description: string
  status: 'NEW' | 'VIEWED' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED'
  createdAt: string
}

export default function DashboardOrcamentosPage() {
  const [quotes, setQuotes] = useState<QuoteItem[]>([])
  const [error, setError] = useState<string | null>(null)

  function loadQuotes() {
    apiClient<QuoteItem[]>('/quotes/my', undefined, true)
      .then(setQuotes)
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar orçamentos.'))
  }

  useEffect(() => {
    loadQuotes()
  }, [])

  async function updateStatus(id: string, status: QuoteItem['status']) {
    try {
      await apiClient(`/quotes/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }, true)
      loadQuotes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao atualizar lead.')
    }
  }

  return (
    <div className="glass rounded-[30px] border p-7">
      <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Inbox de orçamentos</div>
      <h1 className="mt-3 text-3xl font-black text-white">Leads recebidos pelo seu perfil.</h1>
      <p className="mt-3 text-sm leading-7 text-slate-300">Recurso desbloqueado em planos Pro e Premium. Ao chegar um lead, o backend pode disparar o webhook transacional para o n8n e gerar aviso via Evolution.</p>

      {error ? <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

      <div className="mt-6 grid gap-4">
        {quotes.length ? quotes.map((quote) => (
          <div key={quote.id} className="rounded-[26px] border border-white/8 bg-white/4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-lg font-black text-white">{quote.clientName}</div>
                <div className="mt-1 text-sm text-slate-400">{quote.clientCity}/{quote.clientState} • {quote.clientPhone}</div>
              </div>
              <select value={quote.status} onChange={(event) => updateStatus(quote.id, event.target.value as QuoteItem['status'])} className="h-11 rounded-full border border-white/10 bg-slate-950/45 px-4 text-sm text-white outline-none">
                <option value="NEW">NEW</option>
                <option value="VIEWED">VIEWED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
            {quote.serviceType ? <div className="mt-3 text-sm font-semibold text-cyan-100">Serviço: {quote.serviceType}</div> : null}
            <p className="mt-3 text-sm leading-7 text-slate-300">{quote.description}</p>
          </div>
        )) : <div className="rounded-[24px] border border-dashed border-white/10 p-5 text-sm text-slate-400">Nenhum orçamento recebido ainda.</div>}
      </div>
    </div>
  )
}
