import Link from 'next/link'
import { PricingGrid } from '@/components/pricing'
import { SectionHeader, Surface } from '@/components/ui'

export const metadata = { title: 'Planos' }

export default function PlanosPage() {
  return (
    <div className="container-app py-14">
      <SectionHeader
        eyebrow="Planos AchaFrio"
        title="Escolha o nível de visibilidade que faz sentido para o seu momento."
        description="O plano gratuito coloca seu perfil no ar. Os planos pagos destravam contato, prova social, ranking e geração de leads."
      />

      <div className="mt-10">
        <PricingGrid />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Surface>
          <div className="text-xl font-semibold text-white">O que muda na prática?</div>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
            <div>• FREE deixa o perfil público, mas mantém contato oculto.</div>
            <div>• STARTER libera contato, avaliações e mais credibilidade.</div>
            <div>• PRO ativa orçamentos e melhora presença comercial.</div>
            <div>• PREMIUM entrega prioridade máxima e mais destaque visual.</div>
          </div>
        </Surface>

        <Surface>
          <div className="text-xl font-semibold text-white">Quando assinar?</div>
          <p className="mt-4 text-sm leading-7 text-slate-300">Quando você já estiver com perfil básico montado e quiser transformar tráfego em contato. A estrutura atual suporta cobrança recorrente e sincronização via Asaas, mas ainda vale validar tudo em sandbox antes de vender de verdade.</p>
          <Link href="/cadastro" className="btn-primary mt-6">Criar minha conta</Link>
        </Surface>
      </div>
    </div>
  )
}
