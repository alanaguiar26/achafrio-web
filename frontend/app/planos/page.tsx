import Link from 'next/link'
import { ArrowRight, Gem, Megaphone, ShieldCheck } from 'lucide-react'
import { PricingGrid } from '@/components/pricing'
import { SectionHeader, Surface } from '@/components/ui'

export const metadata = { title: 'Planos' }

export default function PlanosPage() {
  return (
    <div className="container-app py-12 md:py-14">
      <Surface className="bg-gradient-to-r from-violet-500/[0.06] via-white/[0.03] to-cyan-500/[0.08] p-6 md:p-8">
        <SectionHeader
          eyebrow="Planos AchaFrio"
          title="Escolha o plano ideal para transformar visibilidade em contatos."
          description="Cada nível foi desenhado para aumentar presença, confiança e capacidade de gerar oportunidades reais sem deixar a experiência poluída."
          compact
        />
      </Surface>

      <div className="mt-10">
        <PricingGrid />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Surface className="tone-lilac">
          <div className="flex items-center gap-3 text-white">
            <Megaphone className="h-5 w-5 text-cyan-200" />
            <div className="text-xl font-semibold">O que muda na prática</div>
          </div>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-300">
            <div className="surface-inset p-4">FREE valida o perfil e te coloca na plataforma.</div>
            <div className="surface-inset p-4">STARTER libera contato e melhora credibilidade.</div>
            <div className="surface-inset p-4">PRO abre orçamento e sobe seu peso comercial.</div>
            <div className="surface-inset p-4">PREMIUM entrega prioridade visual e percepção premium.</div>
          </div>
        </Surface>

        <Surface className="tone-peach">
          <div className="flex items-center gap-3 text-white">
            <Gem className="h-5 w-5 text-amber-200" />
            <div className="text-xl font-semibold">Quando vale subir de plano</div>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Quando seu perfil já está completo e você quer converter mais visitas em chamadas, mensagens ou orçamento. O ganho vem de visibilidade, reputação e canais liberados.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="meta-chip"><ShieldCheck className="h-4 w-4" />Mais prova social</span>
            <span className="meta-chip">Mais destaque na busca</span>
            <span className="meta-chip">Mais contatos e leads</span>
          </div>
          <div className="mt-7">
            <Link href="/cadastro" className="btn-primary">Criar minha conta <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Surface>
      </div>
    </div>
  )
}
