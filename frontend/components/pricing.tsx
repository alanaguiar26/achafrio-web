import Link from 'next/link'
import { CheckCircle2, Crown, Sparkles, Zap } from 'lucide-react'

const plans = [
  {
    name: 'FREE',
    price: 'R$ 0',
    note: '/mês',
    description: 'Para colocar o perfil no ar e começar a aparecer na plataforma.',
    features: ['Perfil público básico', 'Até 2 especialidades', '1 cidade atendida', 'Contato oculto'],
    cta: 'Começar grátis',
    tone: 'from-white/10 via-cyan-500/4 to-white/3',
  },
  {
    name: 'STARTER',
    price: 'R$ 39,90',
    note: '/mês',
    description: 'Libera contato e melhora a percepção de confiança para fechar mais rápido.',
    features: ['Contato visível', '5 fotos', '5 especialidades', '3 cidades', 'Solicitar avaliações'],
    cta: 'Assinar Starter',
    tone: 'from-cyan-500/18 via-sky-500/7 to-white/4',
  },
  {
    name: 'PRO',
    price: 'R$ 79,90',
    note: '/mês',
    description: 'Equilíbrio entre visibilidade, reputação e geração de orçamento.',
    features: ['Receber orçamentos', '15 fotos', '15 especialidades', '10 cidades', 'Mais destaque na busca'],
    cta: 'Assinar Pro',
    highlighted: true,
    tone: 'from-violet-500/18 via-cyan-500/16 to-white/4',
  },
  {
    name: 'PREMIUM',
    price: 'R$ 149,90',
    note: '/mês',
    description: 'Máxima prioridade comercial para quem quer presença forte e premium.',
    features: ['Topo da busca', 'Recursos ampliados', 'Selo premium', 'Orçamentos prioritários', 'Mais conversão'],
    cta: 'Assinar Premium',
    tone: 'from-amber-400/16 via-rose-400/10 to-white/4',
  },
]

export function PricingGrid() {
  return (
    <div className="grid gap-5 xl:grid-cols-4">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={[
            'glass rounded-[32px] border p-6 md:p-7',
            'bg-gradient-to-b',
            plan.tone,
            plan.highlighted ? 'border-cyan-300/25 shadow-[0_28px_84px_rgba(88,131,255,0.24)]' : '',
          ].join(' ')}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-lg font-bold tracking-[-0.03em] text-white">{plan.name}</div>
            {plan.highlighted ? <span className="badge bg-white/10 text-cyan-100"><Sparkles className="h-4 w-4" />Mais buscado</span> : null}
          </div>
          <div className="mt-5 flex items-end gap-2">
            <div className="text-4xl font-black tracking-[-0.05em] text-white md:text-[2.75rem]">{plan.price}</div>
            <div className="pb-1 text-sm text-slate-400">{plan.note}</div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">{plan.description}</p>

          <div className="mt-6 grid gap-3">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 text-sm text-slate-100">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between rounded-[22px] border border-white/8 bg-slate-950/35 px-4 py-3 text-xs text-slate-300">
            <span>{plan.highlighted ? 'Melhor custo-benefício' : 'Upgrade quando quiser'}</span>
            {plan.highlighted ? <Crown className="h-4 w-4 text-yellow-300" /> : <Zap className="h-4 w-4 text-cyan-300" />}
          </div>

          <Link href="/cadastro" className={plan.highlighted ? 'btn-primary mt-6 w-full' : 'btn-secondary mt-6 w-full'}>
            {plan.cta}
          </Link>
        </div>
      ))}
    </div>
  )
}
