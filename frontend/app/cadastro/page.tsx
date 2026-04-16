'use client'

import Link from 'next/link'
import { ArrowRight, BadgeCheck, Building2, LayoutGrid, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { apiClient } from '@/lib/client-auth'

const advantages = [
  { title: 'Mais confiança', text: 'Verificação, avaliações moderadas e página pública com melhor leitura visual.', icon: ShieldCheck },
  { title: 'Mais destaque', text: 'Planos liberam contato, ranking comercial e recursos premium para vender serviço.', icon: Sparkles },
  { title: 'Mais praticidade', text: 'Painel centralizado para editar perfil, pedir avaliações e receber leads.', icon: LayoutGrid },
]

export default function CadastroPage() {
  const [type, setType] = useState<'TECNICO' | 'EMPRESA'>('TECNICO')
  const [form, setForm] = useState({ name: '', email: '', city: '', state: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ ...form, state: form.state.toUpperCase(), type }),
      })
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar conta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-app py-12 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="glass tone-peach rounded-[34px] border p-7 md:p-10">
          <div className="eyebrow">Cadastrar serviço</div>
          <h1 className="section-title-sm mt-5 max-w-[12ch]">Crie um perfil que pareça profissional, confiável e pronto para vender.</h1>
          <p className="section-subtitle mt-5">
            O cadastro já nasce preparado para SEO, prova social, upgrade de plano e geração de contatos em um layout mais sólido e menos genérico.
          </p>

          <div className="mt-8 grid gap-4">
            {advantages.map((item) => (
              <div key={item.title} className="surface-inset p-5">
                <item.icon className="h-5 w-5 text-cyan-200" />
                <div className="mt-4 text-lg font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-300">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[34px] border p-7 md:p-10">
          <div className="text-3xl font-black tracking-[-0.04em] text-white">Abra sua conta</div>
          <p className="mt-3 text-sm leading-7 text-slate-400">Complete os dados iniciais. Depois você ajusta tudo no painel.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setType('TECNICO')} className={`rounded-[22px] border p-4 text-left transition ${type === 'TECNICO' ? 'border-cyan-300/25 bg-cyan-500/10' : 'border-white/8 bg-white/4'}`}>
              <div className="font-semibold text-white">Técnico autônomo</div>
              <div className="mt-2 text-sm text-slate-400">Perfil individual com foco em contato, reputação e área atendida.</div>
            </button>
            <button type="button" onClick={() => setType('EMPRESA')} className={`rounded-[22px] border p-4 text-left transition ${type === 'EMPRESA' ? 'border-violet-300/25 bg-violet-500/10' : 'border-white/8 bg-white/4'}`}>
              <div className="font-semibold text-white">Empresa</div>
              <div className="mt-2 text-sm text-slate-400">Página institucional com mais presença, portfólio e visibilidade.</div>
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-200">
              Nome do perfil
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-field" required />
            </label>

            <label className="grid gap-2 text-sm text-slate-200">
              Email
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-field" required />
            </label>

            <div className="grid gap-4 sm:grid-cols-[1.2fr_0.55fr]">
              <label className="grid gap-2 text-sm text-slate-200">
                Cidade
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="form-field" required />
              </label>
              <label className="grid gap-2 text-sm text-slate-200">
                UF
                <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value.toUpperCase() })} className="form-field" maxLength={2} required />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-slate-200">
              Senha
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="form-field" required />
            </label>

            {error ? <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

            <button type="submit" disabled={loading} className="btn-primary mt-2 w-full cursor-pointer disabled:opacity-70">
              {loading ? 'Criando conta...' : 'Criar conta e abrir painel'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="meta-chip"><BadgeCheck className="h-4 w-4" />Comece no FREE</span>
            <span>Já tem conta? <Link href="/login" className="font-semibold text-cyan-200">Entrar</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}
