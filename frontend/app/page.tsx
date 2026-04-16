import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, BadgeCheck, Building2, MessageCircle, Quote, Search, ShieldCheck, Star } from 'lucide-react'
import { PricingGrid } from '@/components/pricing'
import { SearchForm } from '@/components/search-form'
import { SectionHeader, Stat, Surface } from '@/components/ui'

export default function HomePage() {
  return (
    <>
      <section className="container-app pt-12 md:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.18fr_0.82fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan-300/12 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Plataforma nacional para HVAC & refrigeração
            </div>
            <h1 className="section-title max-w-4xl">
              Encontre profissionais de <span className="gradient-text">ar-condicionado e refrigeração</span> com mais confiança.
            </h1>
            <p className="section-subtitle mt-6 max-w-2xl">
              O AchaFrio conecta clientes a técnicos autônomos e empresas em todo o Brasil com perfis verificados,
              avaliações reais e busca por cidade para transformar visitas em contato mais rápido.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/buscar" className="btn-primary">
                <Search className="h-4 w-4" />
                Buscar profissionais
              </Link>
              <Link href="/cadastro" className="btn-secondary">
                <Building2 className="h-4 w-4" />
                Cadastrar meu serviço
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Stat value="4x" label="Mais confiança" hint="Com verificação e avaliações moderadas" />
              <Stat value="PRO+" label="Receba leads" hint="Inbox no painel + notificação" />
              <Stat value="SEO" label="Páginas indexáveis" hint="Busca por cidade, UF e serviço" />
            </div>
          </div>

          <Surface className="overflow-hidden">
            <div className="rounded-[26px] border border-cyan-200/10 bg-slate-950/30 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Busca inteligente</div>
                  <div className="mt-2 text-2xl font-semibold text-white">Procure por cidade, UF e especialidade.</div>
                </div>
                <div className="badge bg-emerald-500/12 text-emerald-300">
                  <BadgeCheck className="h-4 w-4" />
                  Perfis verificados
                </div>
              </div>

              <div className="mt-6">
                <Suspense fallback={<div className="glass rounded-[28px] border p-5 text-sm text-slate-400">Carregando busca…</div>}>
                  <SearchForm />
                </Suspense>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ['Mais destaque', 'Planos pagos aparecem acima e convertem melhor.'],
                  ['Contato direto', 'WhatsApp, telefone e site liberados para planos pagos.'],
                  ['Avaliações reais', 'Links únicos com expiração e moderação pelo admin.'],
                  ['Orçamentos', 'Disponível em planos Pro e Premium com inbox no painel.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-3xl border border-white/8 bg-white/4 p-4">
                    <div className="font-semibold text-white">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </Surface>
        </div>
      </section>

      <section className="container-app mt-24">
        <SectionHeader
          eyebrow="Por que converte"
          title="Uma vitrine profissional pensada para gerar confiança e ação."
          description="Cada página do AchaFrio foi revista para reduzir ruído visual, organizar melhor a informação e deixar os CTAs mais claros."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {[
            {
              icon: ShieldCheck,
              title: 'Verificação de perfil',
              text: 'Documento e selfie opcional com aprovação no admin para gerar mais credibilidade.',
            },
            {
              icon: Star,
              title: 'Avaliações autênticas',
              text: 'Links únicos, expiração em 7 dias e moderação para reduzir fraude e spam.',
            },
            {
              icon: MessageCircle,
              title: 'Contato e leads',
              text: 'Contato direto nos planos pagos e orçamento no painel para Pro e Premium.',
            },
            {
              icon: Quote,
              title: 'Busca com ranking comercial',
              text: 'Ordenação por plano, verificação, reputação e popularidade para priorizar quem investe.',
            },
          ].map((item) => (
            <Surface key={item.title} className="card-hover">
              <item.icon className="h-8 w-8 text-cyan-200" />
              <div className="mt-5 text-lg font-semibold text-white">{item.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
            </Surface>
          ))}
        </div>
      </section>

      <section className="container-app mt-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Como funciona"
            title="O fluxo foi organizado para o negócio vender com menos fricção."
            description="Da busca até o contato, a navegação ficou mais limpa e mais objetiva para o visitante decidir rápido."
          />

          <div className="grid gap-4">
            {[
              ['1. Cliente busca por cidade, UF e especialidade', 'A plataforma prioriza perfis pagos, verificados e com reputação melhor.'],
              ['2. O perfil convence com selo, fotos e avaliações', 'A página pública traz CTA forte para WhatsApp, telefone e orçamento.'],
              ['3. O profissional recebe ação no painel', 'Orçamento cai no inbox e também pode gerar notificação via n8n + Evolution.'],
              ['4. O plano pago ganha mais resultado', 'Mais destaque, mais informações visíveis, mais cidades e mais chances de contato.'],
            ].map(([title, text]) => (
              <Surface key={title}>
                <div className="text-lg font-semibold text-white">{title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app mt-24">
        <SectionHeader
          eyebrow="Planos"
          title="Monetização por visibilidade e recursos."
          description="O FREE ajuda a encher a base. Os pagos destravam contato, reputação, ranking e geração de leads."
          align="center"
        />
        <div className="mt-10">
          <PricingGrid />
        </div>
      </section>

      <section className="container-app mt-24 pb-24">
        <Surface className="overflow-hidden">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">CTA final</div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
                Quer transformar visitas em contatos com uma vitrine profissional?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Cadastre seu serviço, libere seu contato, receba avaliações e gere mais orçamento com um perfil profissional no AchaFrio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/cadastro" className="btn-primary">
                Cadastrar meu perfil
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/planos" className="btn-secondary">Ver planos</Link>
            </div>
          </div>
        </Surface>
      </section>
    </>
  )
}
