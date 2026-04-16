import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, Crown, MessageCircleMore, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { PricingGrid } from '@/components/pricing'
import { SearchForm } from '@/components/search-form'
import { SectionHeader, Stat, Surface } from '@/components/ui'

const benefits = [
  { title: 'Perfis mais confiáveis', text: 'Verificação, avaliações moderadas e estrutura pensada para gerar contato.', icon: ShieldCheck },
  { title: 'Mais visibilidade paga', text: 'Planos destacados sobem na busca e mostram mais informações públicas.', icon: Crown },
  { title: 'Leads no painel', text: 'Orçamentos entram no inbox e podem acionar n8n + Evolution.', icon: MessageCircleMore },
]

export default function HomePage() {
  return (
    <>
      <section className="container-app pt-10 md:pt-16">
        <Surface className="hero-surface overflow-hidden p-7 md:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
            <div>
              <div className="eyebrow">Marketplace nacional para climatização</div>
              <h1 className="section-title mt-5 max-w-4xl">
                Encontre técnicos e empresas de <span className="gradient-text">ar-condicionado e refrigeração</span> sem perder tempo.
              </h1>
              <p className="section-subtitle mt-5 max-w-2xl">
                Busca simples, perfis mais confiáveis, contato mais direto e estrutura comercial para quem quer vender serviço de verdade.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/buscar" className="btn-primary"><Search className="h-4 w-4" />Buscar profissionais</Link>
                <Link href="/cadastro" className="btn-secondary"><Building2 className="h-4 w-4" />Cadastrar meu perfil</Link>
              </div>

              <div className="mt-8 soft-grid-3">
                <Stat value="Busca" label="Rápida e objetiva" hint="Cidade, UF e especialidade em poucos segundos" />
                <Stat value="Planos" label="Com ranking comercial" hint="Páginas pagas sobem primeiro e convertem mais" />
                <Stat value="Painel" label="Para leads e reputação" hint="Avaliações, verificação e orçamentos no mesmo lugar" />
              </div>
            </div>

            <div className="grid gap-4">
              <Surface className="bg-white/3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Busca pública</div>
                    <div className="mt-2 text-2xl font-semibold text-white">Ache mais rápido.</div>
                  </div>
                  <div className="badge bg-emerald-500/12 text-emerald-300"><BadgeCheck className="h-4 w-4" />Perfis verificados</div>
                </div>
                <div className="mt-5">
                  <Suspense fallback={<div className="rounded-[24px] border border-white/10 bg-white/3 p-4 text-sm text-slate-400">Carregando busca…</div>}>
                    <SearchForm />
                  </Suspense>
                </div>
              </Surface>

              <div className="soft-grid md:grid-cols-3">
                {benefits.map((item) => (
                  <Surface key={item.title} className="card-hover p-5">
                    <item.icon className="h-5 w-5 text-cyan-200" />
                    <div className="mt-4 text-lg font-semibold text-white">{item.title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-400">{item.text}</div>
                  </Surface>
                ))}
              </div>
            </div>
          </div>
        </Surface>
      </section>

      <section className="container-app mt-20">
        <SectionHeader
          eyebrow="Por que funciona"
          title="Menos ruído visual. Mais confiança. Mais ação."
          description="O AchaFrio foi reorganizado para ficar mais claro para o cliente e mais útil para o profissional."
          align="center"
        />
        <div className="mt-10 soft-grid-4">
          {[
            ['Busca enxuta', 'Sem excesso de informação logo de cara.'],
            ['Perfil comercial', 'Fotos, selo, reputação e CTAs em destaque.'],
            ['Leads organizados', 'Painel com orçamentos, avaliações e assinatura.'],
            ['Monetização clara', 'Planos sobem na busca e liberam mais recursos.'],
          ].map(([title, text]) => (
            <Surface key={title} className="card-hover p-5">
              <div className="text-lg font-semibold text-white">{title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
            </Surface>
          ))}
        </div>
      </section>

      <section className="container-app mt-20">
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <SectionHeader
            eyebrow="Fluxo comercial"
            title="O visitante chega mais rápido ao profissional certo."
            description="Em vez de gritar informação na tela, a estrutura conduz o usuário até o contato ou orçamento."
          />
          <div className="grid gap-4">
            {[
              ['1. Busca por cidade, UF e especialidade', 'A ordenação já prioriza plano, verificação e reputação.'],
              ['2. Perfil convence', 'Página pública mostra foto, cidade atendida, especialidades e prova social.'],
              ['3. Contato ou orçamento', 'WhatsApp, telefone e orçamento entram em cena conforme o plano.'],
              ['4. Painel acompanha', 'O profissional acompanha assinatura, leads e próximos passos.'],
            ].map(([title, text]) => (
              <Surface key={title} className="p-5 md:p-6">
                <div className="text-lg font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app mt-20">
        <SectionHeader
          eyebrow="Planos"
          title="Visibilidade e recursos que fazem sentido para o negócio."
          description="Do FREE ao PREMIUM, cada plano libera mais presença pública, mais prova social e mais chance de contato."
          align="center"
        />
        <div className="mt-10">
          <PricingGrid />
        </div>
      </section>

      <section className="container-app mt-20 pb-24">
        <Surface className="overflow-hidden p-7 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="eyebrow">Pronto para começar</div>
              <h2 className="section-title mt-5 max-w-3xl">Monte um perfil mais sério, profissional e fácil de converter.</h2>
              <p className="section-subtitle mt-4 max-w-2xl">Cadastre seu serviço, organize sua presença online e prepare o terreno para avaliações, verificação e geração de leads.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/cadastro" className="btn-primary">Criar meu perfil<ArrowRight className="h-4 w-4" /></Link>
              <Link href="/planos" className="btn-secondary">Ver planos</Link>
            </div>
          </div>
        </Surface>
      </section>
    </>
  )
}
