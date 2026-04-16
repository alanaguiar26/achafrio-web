import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, BadgeCheck, Crown, MessageSquareText, Search, ShieldCheck, Sparkles, Star, WalletCards } from 'lucide-react'
import { PricingGrid } from '@/components/pricing'
import { SearchForm } from '@/components/search-form'
import { SectionHeader, Stat, Surface } from '@/components/ui'

const heroPoints = [
  { title: 'Busca objetiva', text: 'Cidade, UF e especialidade sem atrito.', tone: 'tone-sky' },
  { title: 'Mais confiança', text: 'Selos, fotos e avaliações no lugar certo.', tone: 'tone-lilac' },
  { title: 'Plano que escala', text: 'Contato visível, ranking e orçamento no painel.', tone: 'tone-peach' },
]

const highlights = [
  { value: '24h', label: 'Perfil no ar', hint: 'Cadastro leve, painel pronto e upgrade quando fizer sentido.', accent: 'cyan' as const },
  { value: 'PRO+', label: 'Leads no painel', hint: 'Orçamento e ação centralizados com notificação transacional.', accent: 'violet' as const },
  { value: 'SEO', label: 'Página indexável', hint: 'Cidade, especialidade e reputação ajudam a reforçar presença digital.', accent: 'emerald' as const },
]

export default function HomePage() {
  return (
    <>
      <section className="container-app pt-8 md:pt-14">
        <Surface className="hero-surface p-6 md:p-10 lg:p-12">
          <div className="hero-split gap-8 lg:gap-10">
            <div>
              <div className="eyebrow">Plataforma nacional para climatização e refrigeração</div>
              <h1 className="section-title mt-5 max-w-[11ch]">
                Encontre profissionais de <span className="gradient-text">climatização e refrigeração</span> com mais confiança.
              </h1>
              <p className="section-subtitle mt-5 max-w-xl">
                O AchaFrio conecta clientes a técnicos e empresas com perfil profissional, destaque comercial, verificação, avaliações reais e páginas prontas para gerar contato.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/buscar" className="btn-primary"><Search className="h-4 w-4" />Buscar profissionais</Link>
                <Link href="/cadastro" className="btn-secondary">Cadastrar meu serviço</Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="meta-chip"><BadgeCheck className="h-4 w-4" />Perfis verificados</span>
                <span className="meta-chip"><Star className="h-4 w-4 text-yellow-300" />Avaliações moderadas</span>
                <span className="meta-chip"><WalletCards className="h-4 w-4" />Leads em PRO e PREMIUM</span>
              </div>

              <div className="mt-8 info-strip">
                {highlights.map((item) => (
                  <Stat key={item.label} value={item.value} label={item.label} hint={item.hint} accent={item.accent} />
                ))}
              </div>
            </div>

            <div className="hero-search-grid">
              <Surface className="bg-gradient-to-br from-white/[0.03] via-cyan-500/[0.05] to-violet-500/[0.06] p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="eyebrow">Busca inteligente</div>
                    <div className="mt-4 text-[2rem] font-black tracking-[-0.05em] text-white">Ache mais rápido.</div>
                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">Filtre por cidade, UF ou especialidade e vá direto para quem tem melhor encaixe comercial.</p>
                  </div>
                  <span className="badge bg-emerald-500/12 text-emerald-200"><BadgeCheck className="h-4 w-4" />Com reputação</span>
                </div>
                <div className="mt-6">
                  <Suspense fallback={<div className="rounded-[24px] border border-white/10 bg-white/3 p-4 text-sm text-slate-400">Carregando busca…</div>}>
                    <SearchForm />
                  </Suspense>
                </div>
              </Surface>

              <div className="soft-grid-3">
                {heroPoints.map((item, index) => (
                  <Surface key={item.title} className={`${item.tone} callout-card p-5 md:p-5`}>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      {index === 0 ? <Search className="h-4 w-4 text-cyan-200" /> : index === 1 ? <ShieldCheck className="h-4 w-4 text-violet-200" /> : <Crown className="h-4 w-4 text-amber-200" />}
                      {item.title}
                    </div>
                    <div className="mt-3 text-sm leading-7 text-slate-300">{item.text}</div>
                  </Surface>
                ))}
              </div>
            </div>
          </div>
        </Surface>
      </section>

      <section className="container-app mt-20">
        <SectionHeader
          eyebrow="Por que fica melhor"
          title="Visual mais vivo, leitura mais clara e menos sensação de tela apertada."
          description="A nova direção prioriza hierarquia, respiro, contraste e blocos comerciais fáceis de entender em desktop e mobile."
          align="center"
          compact
        />

        <div className="mt-10 soft-grid-4">
          {[
            ['Mais respiro', 'Títulos grandes, mas controlados. Espaçamento melhor e menos coluna espremida.', 'tone-peach'],
            ['Busca mais útil', 'Campos maiores, botão claro e menos ruído visual logo no primeiro bloco.', 'tone-sky'],
            ['Cores com mais vida', 'Cyan, violeta, coral e verde entram como apoio sem cansar a leitura.', 'tone-lilac'],
            ['Upgrade mais tangível', 'Os planos mostram o ganho real sem cara de tabela genérica.', 'tone-mint'],
          ].map(([title, text, tone]) => (
            <Surface key={title} className={`${tone} card-hover p-5 md:p-6`}>
              <div className="text-lg font-semibold text-white">{title}</div>
              <div className="mt-2 text-sm leading-7 text-slate-300">{text}</div>
            </Surface>
          ))}
        </div>
      </section>

      <section className="container-app mt-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Jornada comercial"
            title="O visitante entende rápido o que fazer e chega ao contato com menos atrito."
            description="A home deixa de tentar dizer tudo ao mesmo tempo e passa a organizar confiança, prova social, busca e upgrade de forma mais elegante."
            compact
          />

          <div className="grid gap-4">
            {[
              ['1. Busca por cidade, UF e especialidade', 'A entrada principal ficou mais clara, ampla e fácil de usar.'],
              ['2. Perfil transmite confiança', 'Fotos, selos, especialidades e avaliações ganham melhor hierarquia.'],
              ['3. Canal certo no momento certo', 'WhatsApp, telefone, site e orçamento aparecem conforme o plano.'],
              ['4. O profissional acompanha tudo no painel', 'Leads, reputação, verificação e assinatura continuam centralizados.'],
            ].map(([title, text], index) => (
              <Surface key={title} className={index % 2 === 0 ? 'tone-sky p-5 md:p-6' : 'tone-peach p-5 md:p-6'}>
                <div className="text-lg font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app mt-20">
        <SectionHeader
          eyebrow="Planos"
          title="Planos com ganho perceptível e sensação real de evolução."
          description="O usuário precisa olhar e entender por que STARTER, PRO e PREMIUM aumentam presença, confiança e geração de contatos."
          align="center"
          compact
        />
        <div className="mt-10">
          <PricingGrid />
        </div>
      </section>

      <section className="container-app mt-20 mb-6">
        <Surface className="overflow-hidden bg-gradient-to-r from-cyan-500/12 via-white/[0.03] to-orange-400/12 p-6 md:p-9">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="eyebrow">Chamada final</div>
              <h2 className="section-title-sm mt-4 max-w-3xl">Crie um perfil com mais valor percebido, mais confiança e mais chance de virar contato.</h2>
              <p className="section-subtitle mt-4 max-w-2xl">Comece no FREE e suba quando quiser liberar contato, reputação, ranking e geração de orçamentos.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/cadastro" className="btn-primary">Cadastrar meu perfil <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/planos" className="btn-secondary">Comparar planos</Link>
            </div>
          </div>
        </Surface>
      </section>
    </>
  )
}
