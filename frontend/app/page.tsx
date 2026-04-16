import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight, BadgeCheck, Building2, Crown, MessageSquareText, Search, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { PricingGrid } from '@/components/pricing'
import { SearchForm } from '@/components/search-form'
import { SectionHeader, Stat, Surface } from '@/components/ui'

const heroPoints = [
  { title: 'Busca com foco comercial', text: 'Cidade, UF e especialidade na frente. Menos fricção para o visitante.', icon: Search },
  { title: 'Perfil que passa confiança', text: 'Fotos, verificação, avaliações e prova social posicionadas para conversão.', icon: ShieldCheck },
  { title: 'Plano pago com mais retorno', text: 'Contato visível, ranking, orçamento e mais destaque visual para vender serviço.', icon: Crown },
]

const highlights = [
  { value: '24h', label: 'Para colocar o perfil no ar', hint: 'Cadastro simples, painel pronto e upgrade quando quiser.', accent: 'cyan' as const },
  { value: 'PRO+', label: 'Recebe leads no painel', hint: 'Orçamentos entram no inbox e podem acionar WhatsApp via n8n.', accent: 'violet' as const },
  { value: 'SEO', label: 'Página pública indexável', hint: 'Cidade, especialidade e reputação ajudam a reforçar presença digital.', accent: 'emerald' as const },
]

export default function HomePage() {
  return (
    <>
      <section className="container-app pt-8 md:pt-14">
        <Surface className="hero-surface p-6 md:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="eyebrow">Plataforma nacional para climatização e refrigeração</div>
              <h1 className="section-title mt-5 max-w-4xl">
                Encontre profissionais de <span className="gradient-text">ar-condicionado e refrigeração</span> com uma experiência mais bonita, rápida e confiável.
              </h1>
              <p className="section-subtitle mt-6 max-w-2xl">
                O AchaFrio conecta clientes a técnicos e empresas com perfil público mais profissional, destaque comercial, verificação, avaliações reais e páginas prontas para gerar contato.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/buscar" className="btn-primary"><Search className="h-4 w-4" />Buscar profissionais</Link>
                <Link href="/cadastro" className="btn-secondary"><Building2 className="h-4 w-4" />Cadastrar meu serviço</Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="meta-chip"><BadgeCheck className="h-4 w-4" />Perfis verificados</span>
                <span className="meta-chip"><Star className="h-4 w-4 text-yellow-300" />Avaliações moderadas</span>
                <span className="meta-chip"><MessageSquareText className="h-4 w-4" />Leads em PRO e PREMIUM</span>
              </div>

              <div className="mt-8 info-strip">
                {highlights.map((item) => (
                  <Stat key={item.label} value={item.value} label={item.label} hint={item.hint} accent={item.accent} />
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <Surface className="bg-white/[0.025] p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="eyebrow">Busca inteligente</div>
                    <div className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">Ache mais rápido.</div>
                    <p className="mt-3 text-sm leading-7 text-slate-400">Procure por cidade, UF ou especialidade e vá direto para quem tem mais aderência ao que você precisa.</p>
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
                {heroPoints.map((item) => (
                  <Surface key={item.title} className="card-hover h-full p-5 md:p-6">
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
          eyebrow="Por que converte melhor"
          title="Uma vitrine mais viva, profissional e pronta para gerar mais ação."
          description="A nova proposta visual reduz o excesso de texto e organiza melhor o que realmente pesa na decisão: confiança, localização, reputação e contato."
          align="center"
          compact
        />

        <div className="mt-10 soft-grid-4">
          {[
            ['Visual mais premium', 'Mais contraste, mais respiro e menos sensação de tela improvisada.'],
            ['Busca mais clara', 'O usuário entende rápido onde clicar e o que filtrar.'],
            ['Planos mais tangíveis', 'A diferença entre FREE, STARTER, PRO e PREMIUM fica mais evidente.'],
            ['Painel mais utilizável', 'A leitura de métricas e próximos passos ficou mais natural.'],
          ].map(([title, text]) => (
            <Surface key={title} className="card-hover p-5 md:p-6">
              <div className="text-lg font-semibold text-white">{title}</div>
              <div className="mt-2 text-sm leading-7 text-slate-400">{text}</div>
            </Surface>
          ))}
        </div>
      </section>

      <section className="container-app mt-20">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <SectionHeader
            eyebrow="Jornada comercial"
            title="A plataforma conduz o visitante até o contato ou orçamento com menos esforço."
            description="A experiência pública não tenta dizer tudo de uma vez. Ela organiza a informação para dar segurança e favorecer o próximo clique."
            compact
          />

          <div className="grid gap-4">
            {[
              ['1. Busca por cidade, UF e especialidade', 'A ordenação já prioriza verificação, plano e reputação comercial.'],
              ['2. O perfil transmite confiança', 'Foto, descrição, selos, especialidades e avaliações entram em uma hierarquia mais limpa.'],
              ['3. O cliente escolhe o canal ideal', 'WhatsApp, telefone, site e orçamento aparecem conforme o plano contratado.'],
              ['4. O profissional acompanha tudo no painel', 'Leads, assinatura, próximos passos e reputação ficam centralizados.'],
            ].map(([title, text], index) => (
              <Surface key={title} className={index % 2 === 0 ? 'p-5 md:p-6' : 'p-5 md:p-6 bg-gradient-to-br from-white/4 to-cyan-500/6'}>
                <div className="text-lg font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app mt-20">
        <SectionHeader
          eyebrow="Planos"
          title="Planos com posicionamento claro e sensação real de upgrade."
          description="A monetização fica mais elegante quando o usuário entende rapidamente o que ganha em visibilidade, prova social e geração de contatos."
          align="center"
          compact
        />
        <div className="mt-10">
          <PricingGrid />
        </div>
      </section>

      <section className="container-app mt-20 mb-6">
        <Surface className="overflow-hidden bg-gradient-to-r from-cyan-500/10 via-white/[0.03] to-violet-500/12 p-6 md:p-9">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="eyebrow">Chamada final</div>
              <h2 className="section-title-sm mt-4 max-w-3xl">Crie um perfil que passe confiança, aumente seu valor percebido e gere mais contatos.</h2>
              <p className="section-subtitle mt-4 max-w-2xl">Comece no FREE, ajuste o perfil no painel e suba de plano quando quiser liberar contato, reputação e geração de orçamentos.</p>
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
