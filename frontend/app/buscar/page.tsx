import { Search } from 'lucide-react'
import { SearchForm } from '@/components/search-form'
import { ProfileCard } from '@/components/profile-card'
import { EmptyState, SectionHeader, Surface } from '@/components/ui'
import { getProfiles } from '@/lib/api'

export const metadata = { title: 'Buscar profissionais' }

export default async function BuscarPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams
  const response = await getProfiles(params).catch(() => ({ page: 1, limit: 12, total: 0, data: [] }))

  return (
    <div className="container-app py-12 md:py-14">
      <Surface className="bg-gradient-to-r from-white/[0.02] via-cyan-500/[0.03] to-violet-500/[0.05] p-6 md:p-8">
        <SectionHeader
          eyebrow="Busca pública"
          title="Encontre profissionais por cidade, estado e especialidade."
          description="A busca prioriza presença comercial, verificação e reputação, mas mantém a navegação objetiva para o cliente escolher rápido e bem."
          compact
        />
        <div className="mt-7">
          <SearchForm />
        </div>
      </Surface>

      <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
        <Surface className="h-fit p-5 md:sticky md:top-24 md:p-6">
          <div className="eyebrow">Resumo</div>
          <div className="mt-4 text-5xl font-black tracking-[-0.05em] text-white">{response.total}</div>
          <div className="mt-2 text-sm text-slate-400">perfil(is) encontrado(s)</div>

          <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-300">
            <div className="surface-inset p-4">Pagos e verificados aparecem primeiro.</div>
            <div className="surface-inset p-4">Perfis FREE ficam públicos, mas com contato oculto.</div>
            <div className="surface-inset p-4">Orçamentos entram em cena apenas em PRO e PREMIUM.</div>
          </div>
        </Surface>

        <div className="grid gap-5">
          {response.data.length ? (
            response.data.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
          ) : (
            <EmptyState
              title="Nenhum perfil encontrado por agora."
              description="Tente buscar apenas pela cidade, remover a especialidade ou experimentar uma UF diferente para ampliar os resultados."
              action={<button className="btn-secondary text-sm"><Search className="h-4 w-4" />Ajustar busca</button>}
            />
          )}
        </div>
      </div>
    </div>
  )
}
