import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8 bg-slate-950/70">
      <div className="container-app grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-2xl font-black text-white">AchaFrio</div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">Plataforma para técnicos e empresas de ar-condicionado e refrigeração gerarem mais visibilidade, confiança e oportunidades em todo o Brasil.</p>
        </div>
        <div>
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Navegação</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link href="/">Home</Link>
            <Link href="/buscar">Buscar</Link>
            <Link href="/planos">Planos</Link>
            <Link href="/cadastro">Cadastro</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Confiança</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <span>Perfis verificados</span>
            <span>Avaliações moderadas</span>
            <span>Leads e orçamentos no painel</span>
            <span>Assinaturas recorrentes</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
