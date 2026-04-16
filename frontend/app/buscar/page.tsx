import { SearchForm } from '@/components/search-form'
import { ProfileCard } from '@/components/profile-card'
import { SectionHeader, Surface } from '@/components/ui'
import { getProfiles } from '@/lib/api'

export const metadata = { title: 'Buscar profissionais' }

export default async function BuscarPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams
  const response = await getProfiles(params).catch(() => ({ page: 1, limit: 12, total: 0, data: [] }))

  return (
    <div className="container-app py-14">
      <SectionHeader
        eyebrow="Busca pública"
        title="Encontre profissionais por cidade, estado e especialidade."
        description="Resultados priorizam plano, verificação e reputação, sem poluir a tela com excesso de informação."
      />

      <div className="mt-8"><SearchForm /></div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <Surface className="p-5 md:p-6">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Resumo</div>
          <div className="mt-4 text-4xl font-extrabold text-white">{response.total}</div>
          <div className="mt-1 text-sm text-slate-400">perfil(is) encontrado(s)</div>
          <div className="mt-5 grid gap-2 text-sm leading-6 text-slate-300">
            <div>• Perfis pagos e verificados aparecem primeiro.</div>
            <div>• Perfis FREE ficam públicos, mas sem contato direto.</div>
            <div>• Orçamentos só aparecem em PRO e PREMIUM.</div>
          </div>
        </Surface>

        <div className="grid gap-5">
          {response.data.length ? response.data.map((profile) => <ProfileCard key={profile.id} profile={profile} />) : (
            <Surface className="p-7 md:p-8">
              <div className="text-2xl font-semibold text-white">Nenhum perfil encontrado.</div>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">Tente buscar só pela cidade, remover a especialidade ou testar uma UF diferente para ampliar os resultados.</p>
            </Surface>
          )}
        </div>
      </div>
    </div>
  )
}
