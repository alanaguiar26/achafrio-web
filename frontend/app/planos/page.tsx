import Link from 'next/link'
import { ArrowRight, BadgeCheck, Gem, Megaphone } from 'lucide-react'
import { PricingGrid } from '@/components/pricing'
import { SectionHeader, Surface } from '@/components/ui'

export const metadata = { title: 'Planos' }

export default function PlanosPage() {
  return (
    <div className="container-app py-12 md:py-14">
      <Surface className="bg-gradient-to-r from-white/[0.02] via-violet-500/[0.04] to-cyan-500/[0.05] p-6 md:p-8">
        <SectionHeader
          eyebrow="Planos AchaFrio"
          title="Escolha o plano ideal para transformar visibilidade em contatos."
          description="Cada nível foi desenhado para aumentar presença, confiança e capacidade de gerar mais oportunidades reais sem deixar a página exagerada ou poluída."
          compact
        />
      </Surface>

      <div className="mt-10">
        <PricingGrid />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Surface>
          <div className="flex items-center gap-3 text-white">
            <Megaphone className="h-5 w-5 text-cyan-200" />
            <div className="text-xl font-semibold">O que muda na prática</div>
          </div>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-300">
            <div className="surface-inset p-4">FREE deixa o perfil no ar, mas preserva o contato direto.</div>
            <div className="surface-inset p-4">STARTER melhora credibilidade e libera canais de contato.</div>
            <div className="surface-inset p-4">PRO começa a gerar orçamento e sobe seu peso comercial.</div>
            <div className="surface-inset p-4">PREMIUM entrega máxima prioridade visual e percepção premium.</div>
          </div>
        </Surface>

        <Surface>
          <div className="flex items-center gap-3 text-white">
            <Gem className="h-5 w-5 text-violet-200" />
            <div className="text-xl font-semibold">Quando vale subir de plano</div>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Quando o perfil já estiver minimamente completo e você quiser transformar busca em contato: mais destaque, mais canais visíveis, mais reputação e mais geração de orçamentos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/cadastro" className="btn-primary">Criar minha conta <ArrowRight className="h-4 w-4" /></Link>
            <span className="meta-chip"><BadgeCheck className="h-4 w-4" />Comece no FREE e faça upgrade depois</span>
          </div>
        </Surface>
      </div>
    </div>
  )
}
