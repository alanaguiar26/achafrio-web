import Link from 'next/link'
import { CheckCircle2, Sparkles } from 'lucide-react'

const plans = [
  { name: 'FREE', price: 'R$ 0', description: 'Para começar a aparecer na plataforma.', features: ['Perfil público básico', 'Até 2 especialidades', '1 cidade atendida', 'Contato oculto'], cta: 'Começar grátis', highlighted: false },
  { name: 'STARTER', price: 'R$ 39,90', description: 'Para quem quer mais credibilidade e contato liberado.', features: ['Contato visível', '5 fotos', '5 especialidades', '3 cidades', 'Solicitar avaliações'], cta: 'Assinar Starter', highlighted: false },
  { name: 'PRO', price: 'R$ 79,90', description: 'Plano ideal para gerar leads e crescer com destaque.', features: ['Receber orçamentos', '15 fotos', '15 especialidades', '10 cidades', 'Mais destaque na busca'], cta: 'Assinar Pro', highlighted: true },
  { name: 'PREMIUM', price: 'R$ 149,90', description: 'Máxima visibilidade, confiança e prioridade.', features: ['Topo da busca', 'Recursos ampliados', 'Selo premium', 'Orçamentos prioritários', 'Mais conversão'], cta: 'Assinar Premium', highlighted: false },
]

export function PricingGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {plans.map((plan) => (
        <div key={plan.name} className={[ 'glass rounded-[30px] border p-6', plan.highlighted ? 'border-cyan-300/24 shadow-[0_20px_60px_rgba(34,211,238,0.12)]' : '' ].join(' ')}>
          <div className="flex items-center justify-between gap-3">
            <div className="text-lg font-semibold text-white">{plan.name}</div>
            {plan.highlighted ? <span className="badge bg-cyan-500/14 text-cyan-100"><Sparkles className="h-4 w-4" />Mais buscado</span> : null}
          </div>
          <div className="mt-4 text-4xl font-semibold text-white">{plan.price}<span className="text-base font-medium text-slate-400">/mês</span></div>
          <p className="mt-4 text-sm leading-7 text-slate-400">{plan.description}</p>
          <div className="mt-6 grid gap-3">{plan.features.map((feature) => <div key={feature} className="flex items-start gap-3 text-sm text-slate-200"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /><span>{feature}</span></div>)}</div>
          <Link href="/cadastro" className={plan.highlighted ? 'btn-primary mt-8 w-full' : 'btn-secondary mt-8 w-full'}>{plan.cta}</Link>
        </div>
      ))}
    </div>
  )
}
