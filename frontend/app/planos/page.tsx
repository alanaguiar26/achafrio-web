import Link from 'next/link'
import { PricingGrid } from '@/components/pricing'
import { SectionHeader, Surface } from '@/components/ui'

export const metadata = { title: 'Planos' }

export default function PlanosPage() {
  return (
    <div className="container-app py-14">
      <SectionHeader
        eyebrow="Planos AchaFrio"
        title="Escolha o plano ideal para sua visibilidade e geração de contatos."
        description="Os planos foram pensados para aumentar exposição, confiança e conversão. O FREE coloca seu perfil no ar. Os pagos ajudam você a aparecer acima, liberar contato e gerar mais oportunidades."
      />

      <div className="mt-10"><PricingGrid /></div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Surface>
          <div className="text-lg font-black text-white">O que muda na prática?</div>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>• FREE não exibe WhatsApp, telefone nem site no perfil público.</li>
            <li>• STARTER libera contato, avaliações e verificação.</li>
            <li>• PRO libera orçamentos com inbox no painel.</li>
            <li>• PREMIUM ganha máxima prioridade comercial e destaque visual.</li>
          </ul>
        </Surface>

        <Surface>
          <div className="text-lg font-black text-white">Pronto para subir?</div>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Cadastre seu perfil agora e faça upgrade quando quiser pelo painel. O backend já está preparado para assinaturas recorrentes via Asaas e sincronização automática do plano.
          </p>
          <Link href="/cadastro" className="btn-primary mt-6">Criar minha conta</Link>
        </Surface>
      </div>
    </div>
  )
}
