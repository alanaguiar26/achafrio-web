'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/client-auth'

interface BillingData {
  plan: 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM'
  status: string
  nextDueDate?: string | null
  payments?: Array<{ id: string; status: string; amount: number; invoiceUrl?: string | null; dueDate?: string | null }>
}

const plans = [
  { key: 'STARTER', name: 'Starter', price: 'R$ 39,90', description: 'Contato visível, avaliações e verificação.' },
  { key: 'PRO', name: 'Pro', price: 'R$ 79,90', description: 'Orçamentos, mais cidades, mais especialidades e mais destaque.' },
  { key: 'PREMIUM', name: 'Premium', price: 'R$ 149,90', description: 'Máxima prioridade na busca e vitrine premium.' },
] as const

export default function DashboardAssinaturaPage() {
  const [billing, setBilling] = useState<BillingData | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function loadBilling() {
    apiClient<BillingData | null>('/billing/me', undefined, true)
      .then(setBilling)
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar assinatura.'))
  }

  useEffect(() => {
    loadBilling()
  }, [])

  async function buy(plan: 'STARTER' | 'PRO' | 'PREMIUM') {
    setMessage(null)
    setError(null)
    try {
      const response = await apiClient<{ invoiceUrl?: string | null; pixQrCode?: string | null }>('/billing/checkout', {
        method: 'POST',
        body: JSON.stringify({ plan, billingType: 'PIX' }),
      }, true)
      if (response.invoiceUrl) {
        window.open(response.invoiceUrl, '_blank')
        setMessage('Checkout criado. A fatura foi aberta em nova aba.')
      } else if (response.pixQrCode) {
        setMessage(`Checkout criado. Payload PIX: ${response.pixQrCode}`)
      } else {
        setMessage('Checkout criado com sucesso.')
      }
      loadBilling()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar checkout.')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass rounded-[30px] border p-7">
        <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Assinatura atual</div>
        <h1 className="mt-3 text-3xl font-black text-white">Suba seu plano e aumente sua taxa de contato.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">A integração Asaas cria cliente, assinatura e pagamentos, enquanto os webhooks atualizam o plano e o status no banco.</p>

        <div className="mt-6 rounded-[24px] border border-white/8 bg-white/4 p-5">
          <div className="text-sm text-slate-400">Plano atual</div>
          <div className="mt-2 text-3xl font-black text-white">{billing?.plan ?? 'FREE'}</div>
          <div className="mt-2 text-sm text-slate-300">Status: {billing?.status ?? 'Sem assinatura ativa'}</div>
          {billing?.nextDueDate ? <div className="mt-1 text-sm text-slate-400">Próximo vencimento: {new Date(billing.nextDueDate).toLocaleDateString('pt-BR')}</div> : null}
        </div>

        {message ? <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
        {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
      </div>

      <div className="grid gap-4">
        {plans.map((plan) => (
          <div key={plan.key} className="glass rounded-[30px] border p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xl font-black text-white">{plan.name}</div>
                <div className="mt-2 text-sm leading-7 text-slate-400">{plan.description}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-white">{plan.price}</div>
                <div className="text-sm text-slate-400">/mês</div>
              </div>
            </div>
            <button onClick={() => buy(plan.key)} className="btn-primary mt-6 cursor-pointer text-sm">Assinar com Asaas</button>
          </div>
        ))}
      </div>
    </div>
  )
}
