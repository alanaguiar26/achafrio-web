import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, BadgeCheck, Crown, MapPinned, MessageCircleMore, Search, ShieldCheck, Sparkles, Star, WalletCards } from 'lucide-react'
import { PricingGrid } from '@/components/pricing'
import { getProfiles } from '@/lib/api'
import { SearchForm } from '@/components/search-form'
import { HomeListingFilters } from '@/components/home-listing-filters'
import { ProfileCard } from '@/components/profile-card'
import { EmptyState, SectionHeader, Surface } from '@/components/ui'

const trustLogos = ['Perfis verificados', 'Avaliações moderadas', 'Busca por cidade e UF', 'Leads no painel']

const featureCards = [
  {
    icon: ShieldCheck,
    title: 'Perfil que transmite confiança',
    text: 'Fotos, descrição, especialidades, cidades atendidas e reputação organizadas de forma muito mais clara.',
    tone: 'tone-coral',
  },
  {
    icon: MessageCircleMore,
    title: 'Contato e orçamento no momento certo',
    text: 'Nos planos pagos o visitante chega mais rápido ao WhatsApp, telefone, site ou pedido de orçamento.',
    tone: 'tone-sky',
  },
  {
    icon: Crown,
    title: 'Mais visibilidade para quem investe',
    text: 'Ranking comercial, verificação e prova social aumentam percepção de valor e ajudam a vender melhor.',
    tone: 'tone-violet',
  },
]

const journey = [
  {
    step: '01',
    title: 'Busca simples e direta',
    text: 'Cidade, UF e especialidade aparecem logo no topo em um formato mais aberto e menos espremido.',
  },
  {
    step: '02',
    title: 'Perfis com leitura comercial',
    text: 'O visitante entende rápido quem atende, o que faz, onde atua e por que aquele perfil parece mais confiável.',
  },
  {
    step: '03',
    title: 'Conversão para contato ou orçamento',
    text: 'Planos melhores liberam canais mais fortes sem poluir a navegação para quem está procurando serviço.',
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
    limit: '4',
    page: '1',
  }).catch(() => ({ page: 1, limit: 4, total: 0, data: [] }))

  const browseQuery = new URLSearchParams()
  if (homeCity) browseQuery.set('city', homeCity)
  if (homeState) browseQuery.set('state', homeState)
  if (homeSpecialty) browseQuery.set('specialty', homeSpecialty)
  const browseHref = browseQuery.toString() ? `/buscar?${browseQuery.toString()}` : '/buscar'

  return (
    <>
      <section className="container-app pt-8 md:pt-14">
        <div className="hero-v5-shell">
          <div className="hero-v5-grid">
            <div className="hero-v5-copy">
              <div className="eyebrow">A plataforma nacional para climatização e refrigeração</div>
              <h1 className="hero-v5-title mt-5">
                Encontre profissionais de <span className="gradient-text">ar-condicionado</span> e refrigeração com um visual mais confiável e uma busca mais direta.
              </h1>
              <p className="hero-v5-subtitle mt-5">
                O AchaFrio conecta clientes a técnicos e empresas com páginas profissionais, prova social, verificação e estrutura comercial para gerar mais contatos em todo o Brasil.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/buscar" className="btn-primary"><Search className="h-4 w-4" />Buscar profissionais</Link>
                <Link href="/cadastro" className="btn-secondary">Cadastrar meu serviço</Link>
              </div>

              <div className="hero-microproof mt-8">
                <div className="hero-proof-card tone-mint">
                  <div className="hero-proof-value">4x</div>
                  <div className="hero-proof-label">Mais percepção de confiança</div>
                </div>
                <div className="hero-proof-card tone-coral">
                  <div className="hero-proof-value">PRO+</div>
                  <div className="hero-proof-label">Leads e orçamento no painel</div>
                </div>
                <div className="hero-proof-card tone-violet">
                  <div className="hero-proof-value">SEO</div>
                  <div className="hero-proof-label">Perfis pensados para cidade e especialidade</div>
                </div>
              </div>
            </div>

            <div className="hero-v5-side">
              <Surface className="hero-showcase p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="eyebrow">Painel de confiança</div>
                    <div className="mt-4 text-2xl font-black tracking-[-0.04em] text-white md:text-[2.2rem]">Mais clareza. Menos ruído.</div>
                  </div>
                  <span className="badge bg-emerald-500/12 text-emerald-200"><BadgeCheck className="h-4 w-4" />Verificados</span>
                </div>

                <div className="hero-side-stack mt-6">
                  <div className="hero-side-panel tone-sky">
                    <div className="flex items-center gap-3">
                      <div className="hero-side-icon"><MapPinned className="h-4 w-4" /></div>
                      <div>
                        <div className="text-sm font-semibold text-white">Busca por cidade e UF</div>
                        <div className="mt-1 text-sm text-slate-300">Campos maiores e foco total na intenção de busca.</div>
                      </div>
                    </div>
                  </div>
                  <div className="hero-side-panel tone-violet">
                    <div className="flex items-center gap-3">
                      <div className="hero-side-icon"><Star className="h-4 w-4" /></div>
                      <div>
                        <div className="text-sm font-semibold text-white">Reputação mais visível</div>
                        <div className="mt-1 text-sm text-slate-300">Avaliações e selo aparecem com melhor hierarquia.</div>
                      </div>
                    </div>
                  </div>
                  <div className="hero-side-panel tone-coral">
                    <div className="flex items-center gap-3">
                      <div className="hero-side-icon"><WalletCards className="h-4 w-4" /></div>
                      <div>
                        <div className="text-sm font-semibold text-white">Planos mais tangíveis</div>
                        <div className="mt-1 text-sm text-slate-300">Fica mais fácil entender o ganho real entre FREE, STARTER, PRO e PREMIUM.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Surface>
            </div>
          </div>

          <Surface className="hero-search-band mt-6 p-4 md:p-5 lg:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="eyebrow">Busca inteligente</div>
                <div className="mt-3 text-2xl font-black tracking-[-0.04em] text-white md:text-[2.1rem]">Ache mais rápido sem campos apertados.</div>
                <p className="mt-2 text-sm leading-7 text-slate-300 md:text-[0.98rem]">Procure por cidade, UF ou especialidade e vá direto para quem tem aderência ao serviço que você precisa.</p>
              </div>
              <div className="lg:min-w-[58%] lg:flex-1">
                <Suspense fallback={<div className="rounded-[24px] border border-white/10 bg-white/3 p-4 text-sm text-slate-400">Carregando busca…</div>}>
                  <SearchForm />
                </Suspense>
              </div>
            </div>
          </Surface>

          <div className="hero-trust-bar mt-5">
            {trustLogos.map((item) => (
              <span key={item} className="meta-chip"><Sparkles className="h-4 w-4" />{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="home-destaques" className="container-app mt-18 md:mt-20">
        <div className="home-listing-shell">
          <div className="home-listing-header">
            <div>
              <div className="eyebrow">Destaques da busca</div>
              <h2 className="section-title-sm mt-4 max-w-3xl">Veja perfis reais já ordenados pelas regras comerciais da plataforma.</h2>
              <p className="section-subtitle mt-4 max-w-3xl">A listagem abaixo já respeita a lógica de destaque do AchaFrio: planos mais altos aparecem antes, depois entram verificação, reputação e qualidade geral do perfil. O FREE continua público, mas fica abaixo dos pagos e sem contato liberado.</p>
            </div>
            <div className="home-listing-summary">
              <div className="listing-summary-card tone-sky">
                <div className="listing-summary-value">{featuredResponse.total}</div>
                <div className="listing-summary-label">perfil(is) para este filtro</div>
              </div>
              <div className="listing-summary-note">
                PREMIUM, PRO e STARTER têm prioridade de visibilidade. Dentro do mesmo plano, perfis verificados e melhor reputação sobem primeiro.
              </div>
            </div>
          </div>

          <Surface className="tone-mint p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-lg font-semibold text-white">Filtre os destaques sem sair da home</div>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">Busque por cidade, UF e especialidade. Quando quiser explorar tudo, a busca completa continua disponível.</p>
              </div>
              <Link href={browseHref} className="btn-secondary text-sm">Ver busca completa</Link>
            </div>
            <div className="mt-5">
              <HomeListingFilters />
            </div>
          </Surface>

          <div className="home-listing-grid mt-6">
            {featuredResponse.data.length ? (
              featuredResponse.data.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
            ) : (
              <EmptyState
                className="lg:col-span-2"
                title="Nenhum perfil apareceu com esse filtro."
                description="Experimente buscar só por cidade ou apenas pela especialidade. A home mostra um recorte; a página de busca completa continua disponível para aprofundar."
                action={<Link href="/buscar" className="btn-secondary text-sm">Abrir busca completa</Link>}
              />
            )}
          </div>
        </div>
      </section>

      <section className="container-app mt-20">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Uma home mais comercial"
              title="Menos texto jogado na tela. Mais ritmo, contraste e decisão visual."
              description="A nova estrutura do topo separa mensagem, prova de valor e busca de forma mais elegante. Em vez de um bloco esmagado, a home agora organiza o que realmente importa para quem busca e para quem quer anunciar serviço."
              compact
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {featureCards.map((item) => {
              const Icon = item.icon
              return (
                <Surface key={item.title} className={`${item.tone} card-hover p-5 md:p-6`}>
                  <div className="feature-icon"><Icon className="h-5 w-5" /></div>
                  <div className="mt-5 text-lg font-semibold text-white">{item.title}</div>
                  <div className="mt-3 text-sm leading-7 text-slate-300">{item.text}</div>
                </Surface>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container-app mt-20">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Surface className="tone-mint p-6 md:p-8 lg:p-10">
            <div className="eyebrow">Como funciona</div>
            <h2 className="section-title-sm mt-4 max-w-[16ch]">A plataforma conduz o visitante até o contato com mais naturalidade.</h2>
            <p className="section-subtitle mt-4 max-w-xl">A experiência pública não tenta falar tudo de uma vez. Ela distribui melhor a informação para destacar busca, reputação, especialidades, localização e intenção comercial.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="mini-quote tone-sky">Busca com foco comercial</div>
              <div className="mini-quote tone-coral">Perfis com prova social</div>
              <div className="mini-quote tone-violet">Planos com benefício real</div>
              <div className="mini-quote tone-mint">Dashboard com ação prática</div>
            </div>
          </Surface>

          <div className="grid gap-4">
            {journey.map((item, index) => (
              <Surface key={item.step} className={index === 0 ? 'tone-sky p-5 md:p-6' : index === 1 ? 'tone-coral p-5 md:p-6' : 'tone-violet p-5 md:p-6'}>
                <div className="journey-card">
                  <div className="journey-step">{item.step}</div>
                  <div>
                    <div className="text-lg font-semibold text-white">{item.title}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                  </div>
                </div>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app mt-20">
        <SectionHeader
          eyebrow="Planos"
          title="Posicionamento comercial com ganho de percepção visível."
          description="Os planos continuam claros, mas agora entram depois de uma home que prepara melhor o visitante para entender valor, confiança e visibilidade."
          align="center"
          compact
        />
        <div className="mt-10">
          <PricingGrid />
        </div>
      </section>

      <section className="container-app mt-20 mb-6">
        <Surface className="hero-final-band p-6 md:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="eyebrow">Chamada final</div>
              <h2 className="section-title-sm mt-4 max-w-3xl">Crie um perfil que passe confiança, aumente valor percebido e gere mais contatos.</h2>
              <p className="section-subtitle mt-4 max-w-2xl">Comece no FREE, ajuste seu perfil no painel e suba de plano quando quiser liberar contato, reputação, ranking e geração de orçamentos.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/cadastro" className="btn-primary">Cadastrar meu perfil <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/planos" className="btn-secondary">Ver planos</Link>
            </div>
          </div>
        </Surface>
      </section>
    </>
  )
}
