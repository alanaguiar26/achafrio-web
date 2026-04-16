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
        title="Encontre técnicos e empresas pelo que realmente importa."
        description="Filtre por cidade, estado, especialidade e verificação. O ranking já favorece perfis com mais credibilidade e investimento."
      />

      <div className="mt-8"><SearchForm /></div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <Surface>
          <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Resumo</div>
          <div className="mt-4 text-3xl font-black text-white">{response.total}</div>
          <div className="text-sm text-slate-400">perfil(is) encontrado(s)</div>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <div>• Pagos e verificados sobem na busca</div>
            <div>• FREE aparece sem contato direto</div>
            <div>• Orçamentos só para PRO e PREMIUM</div>
          </div>
        </Surface>

        <div className="grid gap-5">
          {response.data.length ? response.data.map((profile) => <ProfileCard key={profile.id} profile={profile} />) : (
            <Surface>
              <div className="text-xl font-black text-white">Nenhum perfil encontrado.</div>
              <p className="mt-3 text-sm leading-7 text-slate-400">Ajuste os filtros, troque a cidade ou a especialidade e tente novamente.</p>
            </Surface>
          )}
        </div>
      </div>
    </div>
  )
}
