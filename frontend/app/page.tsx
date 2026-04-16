import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, BadgeCheck, CheckCircle2, MessageCircleMore, Search, ShieldCheck, Sparkles, Star, Zap } from 'lucide-react'
import { PricingGrid } from '@/components/pricing'
import { getProfiles } from '@/lib/api'
import { SearchForm } from '@/components/search-form'
import { HomeListingFilters } from '@/components/home-listing-filters'
import { ProfileCard } from '@/components/profile-card'
import { EmptyState, Surface } from '@/components/ui'

const heroPoints = [
  'Busca por cidade, UF e serviço',
  'Perfis verificados e avaliações reais',
  'Contato direto e orçamento conforme o plano',
]

const steps = [
  {
    title: 'Busque sem complicação',
    text: 'Digite cidade, UF ou serviço e veja primeiro quem tem mais aderência ao que o cliente procura.',
  },
  {
    title: 'Compare com segurança',
    text: 'Fotos, especialidades, cidades atendidas, avaliação e selo aparecem com leitura rápida e objetiva.',
  },
  {
    title: 'Converta em contato',
    text: 'WhatsApp, telefone ou orçamento entram no momento certo, sem poluir a navegação.',
  },
]

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Mais confiança na leitura do perfil',
    text: 'Perfis organizados para o visitante entender rápido se encontrou o profissional certo.',
  },
  {
    icon: Star,
    title: 'Prova social de verdade',
    text: 'Avaliações moderadas e verificação ajudam a dar segurança antes do primeiro contato.',
  },
  {
    icon: MessageCircleMore,
    title: 'Mais chance de virar contato',
    text: 'A vitrine favorece quem precisa gerar ligação, WhatsApp ou pedido de orçamento.',
  },
]

export default async function HomePage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams
  const homeCity = params.homeCity
  const homeState = params.homeState
  const homeSpecialty = params.homeSpecialty
  const featuredResponse = await getProfiles({
    city: homeCity,
    state: homeState,
    specialty: homeSpecialty,
    limit: '6',
    page: '1',
  }).catch(() => ({ page: 1, limit: 6, total: 0, data: [] }))

  const browseQuery = new URLSearchParams()
  if (homeCity) browseQuery.set('city', homeCity)
  if (homeState) browseQuery.set('state', homeState)
  if (homeSpecialty) browseQuery.set('specialty', homeSpecialty)
  const browseHref = browseQuery.toString() ? `/buscar?${browseQuery.toString()}` : '/buscar'

  return (
    <>
      <section className="container-app pt-8 md:pt-12">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-stretch">
          <div className="glass rounded-[36px] border px-6 py-8 md:px-9 md:py-10">
            <div className="eyebrow">Encontre e compare profissionais com mais clareza</div>
            <h1 className="mt-5 max-w-[11ch] text-[clamp(2.7rem,5.5vw,5.2rem)] font-black leading-[0.94] tracking-[-0.07em] text-white">
              Ache um técnico com mais segurança e menos perda de tempo.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-slate-300 md:text-[1.08rem]">
              Busque por cidade, UF ou serviço e encontre páginas mais organizadas, com avaliação, verificação e contato direto quando o plano permitir.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#busca-home" className="btn-primary"><Search className="h-4 w-4" />Buscar profissionais</Link>
              <Link href="/cadastro" className="btn-secondary">Cadastrar meu serviço</Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <div className="text-3xl font-black tracking-[-0.06em] text-white">24h</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">Seu perfil pode entrar no ar rapidamente depois do cadastro.</p>
              </div>
              <div className="rounded-[24px] border border-cyan-400/15 bg-cyan-400/[0.06] p-4">
                <div className="text-3xl font-black tracking-[-0.06em] text-white">PRO+</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">Planos pagos liberam mais destaque, contato e orçamento.</p>
              </div>
              <div className="rounded-[24px] border border-violet-400/15 bg-violet-400/[0.06] p-4">
                <div className="text-3xl font-black tracking-[-0.06em] text-white">SEO</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">Perfis prontos para cidade, estado e especialidade.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <Surface className="overflow-hidden rounded-[36px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">Como o visitante enxerga</div>
                  <h2 className="mt-4 text-[clamp(1.7rem,2.6vw,2.5rem)] font-black leading-[1.02] tracking-[-0.05em] text-white">
                    Uma busca mais limpa. Um perfil mais convincente.
                  </h2>
                </div>
                <span className="badge bg-emerald-500/12 text-emerald-100"><BadgeCheck className="h-4 w-4" />Verificados</span>
              </div>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-950/45 p-4 md:p-5">
                <div className="grid gap-3 sm:grid-cols-[1.3fr_0.55fr_1fr_auto]">
                  <div className="rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">Cidade</div>
                    <div className="mt-2 text-sm text-slate-300">Campinas</div>
                  </div>
                  <div className="rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">UF</div>
                    <div className="mt-2 text-sm text-slate-300">SP</div>
                  </div>
                  <div className="rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">Serviço</div>
                    <div className="mt-2 text-sm text-slate-300">Instalação e manutenção</div>
                  </div>
                  <div className="flex items-center">
                    <div className="inline-flex min-h-[58px] w-full items-center justify-center rounded-[20px] bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(75,124,255,0.34)]">Encontrar</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {heroPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Surface>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className={`rounded-[28px] border p-5 ${index === 0 ? 'border-cyan-400/15 bg-cyan-400/[0.05]' : index === 1 ? 'border-violet-400/15 bg-violet-400/[0.05]' : 'border-orange-300/15 bg-orange-400/[0.05]'}`}>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/45 text-cyan-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-[-0.03em] text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="busca-home" className="container-app mt-10 md:mt-14">
        <Surface className="rounded-[34px] border bg-[linear-gradient(135deg,rgba(18,30,54,0.9),rgba(6,14,28,0.98))] p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr] xl:items-center">
            <div>
              <div className="eyebrow">Busca principal</div>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-black leading-[1.02] tracking-[-0.05em] text-white">
                Comece pela cidade, estado ou serviço.
              </h2>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-8 text-slate-300">
                Sem formulário apertado, sem ruído e sem excesso de texto: a busca fica no centro da home para o visitante agir rápido.
              </p>
            </div>
            <Suspense fallback={<div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-400">Carregando busca…</div>}>
              <SearchForm />
            </Suspense>
          </div>
        </Surface>
      </section>

      <section id="home-destaques" className="container-app mt-16 md:mt-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">Perfis em destaque agora</div>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.4vw,3rem)] font-black leading-[1.02] tracking-[-0.05em] text-white">
              A home já mostra profissionais reais seguindo a ordem de destaque do sistema.
            </h2>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-8 text-slate-300">
              PREMIUM, PRO e STARTER aparecem primeiro. Dentro do mesmo plano, entram verificação, reputação e qualidade geral do perfil.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 lg:max-w-[320px]">
            <div className="text-3xl font-black tracking-[-0.06em] text-white">{featuredResponse.total}</div>
            <div className="mt-1">perfil(is) para o filtro atual</div>
          </div>
        </div>

        <Surface className="mt-7 rounded-[32px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-5 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-lg font-bold tracking-[-0.03em] text-white">Filtre a vitrine sem sair da home</div>
              <p className="mt-2 text-sm leading-7 text-slate-300">Refine por cidade, UF e especialidade. Quando quiser explorar tudo, continue na busca completa.</p>
            </div>
            <Link href={browseHref} className="btn-secondary text-sm">Ver busca completa <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-5">
            <Suspense fallback={<div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-400">Carregando filtros…</div>}>
              <HomeListingFilters />
            </Suspense>
          </div>
        </Surface>

        <div className="mt-7 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {featuredResponse.data.length ? (
            featuredResponse.data.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
          ) : (
            <div className="lg:col-span-2 xl:col-span-3">
              <EmptyState
                title="Nenhum perfil apareceu com esse filtro."
                description="Tente buscar só pela cidade ou remova a especialidade. A busca completa continua disponível para aprofundar mais os resultados."
                action={<Link href="/buscar" className="btn-secondary text-sm">Abrir busca completa</Link>}
              />
            </div>
          )}
        </div>
      </section>

      <section className="container-app mt-18 md:mt-22">
        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <Surface className="rounded-[34px] border bg-[linear-gradient(145deg,rgba(255,173,120,0.08),rgba(255,255,255,0.015))] p-6 md:p-8">
            <div className="eyebrow">Como funciona</div>
            <h2 className="mt-4 text-[clamp(2rem,3vw,2.9rem)] font-black leading-[1.03] tracking-[-0.05em] text-white">
              Uma home pensada para levar o visitante até a ação.
            </h2>
            <p className="mt-4 text-[0.98rem] leading-8 text-slate-300">
              Em vez de empilhar informação, a página organiza a jornada: busca, comparação e contato. É isso que torna o AchaFrio mais comercial para quem anuncia.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="meta-chip"><Sparkles className="h-4 w-4" />Busca simples</span>
              <span className="meta-chip"><ShieldCheck className="h-4 w-4" />Perfis confiáveis</span>
              <span className="meta-chip"><Zap className="h-4 w-4" />Mais conversão</span>
            </div>
          </Surface>

          <div className="grid gap-4">
            {steps.map((item, index) => (
              <Surface key={item.title} className="rounded-[28px] border p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-black text-cyan-100">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-[-0.03em] text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                  </div>
                </div>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app mt-18 md:mt-22">
        <div className="text-center">
          <div className="eyebrow mx-auto">Planos</div>
          <h2 className="mx-auto mt-4 max-w-4xl text-[clamp(2rem,3.4vw,3.1rem)] font-black leading-[1.02] tracking-[-0.05em] text-white">
            Planos claros para quem quer sair do gratuito e ganhar visibilidade real.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[0.98rem] leading-8 text-slate-300">
            A diferença entre os planos fica prática: mais exposição, mais contato, mais reputação e mais chance de receber orçamento.
          </p>
        </div>

        <div className="mt-8">
          <PricingGrid />
        </div>
      </section>

      <section className="container-app mt-18 md:mt-22 pb-6 md:pb-10">
        <Surface className="rounded-[36px] border bg-[linear-gradient(145deg,rgba(63,180,255,0.11),rgba(125,109,255,0.08),rgba(255,255,255,0.02))] p-7 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="eyebrow">Para começar</div>
              <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.3vw,3rem)] font-black leading-[1.02] tracking-[-0.05em] text-white">
                Crie seu perfil, organize sua vitrine e transforme visitas em contato.
              </h2>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-slate-300">
                Comece no FREE, complete o perfil no painel e faça upgrade quando quiser destravar contato, reputação, ranking e orçamento.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/cadastro" className="btn-primary">Cadastrar meu perfil</Link>
              <Link href="/planos" className="btn-secondary">Ver planos</Link>
            </div>
          </div>
        </Surface>
      </section>
    </>
  )
}
