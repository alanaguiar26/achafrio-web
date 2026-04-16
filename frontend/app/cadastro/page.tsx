'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ArrowRight, Building2, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { apiClient, setAccessToken } from '@/lib/client-auth'

export default function CadastroPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    type: 'TECNICO',
    name: '',
    email: '',
    password: '',
    city: '',
    state: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient<{ accessToken: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          state: form.state.toUpperCase(),
        }),
      })
      setAccessToken(response.accessToken)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar cadastro.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-app py-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="glass rounded-[32px] border p-8 md:p-10">
          <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Cadastrar serviço</div>
          <h1 className="mt-4 text-4xl font-black text-white">Crie um perfil que pareça grande, confiável e profissional.</h1>
          <p className="mt-4 text-base leading-8 text-slate-300">
            O cadastro já nasce pronto para SEO, prova social, upgrade de plano e geração de contatos em um layout pensado para conversão.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              { icon: ShieldCheck, title: 'Mais confiança', text: 'Selo de verificação, avaliações moderadas e página pública otimizada.' },
              { icon: Building2, title: 'Mais destaque', text: 'Planos com ranking comercial, contato liberado e recursos premium.' },
              { icon: UserRound, title: 'Mais praticidade', text: 'Painel centralizado para editar perfil, pedir avaliações e receber leads.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/4 p-5">
                <item.icon className="h-6 w-6 text-cyan-200" />
                <div className="mt-4 font-black text-white">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-400">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-[32px] border p-8 md:p-10">
          <div className="text-2xl font-black text-white">Abra sua conta</div>
          <p className="mt-2 text-sm leading-7 text-slate-400">Complete os dados iniciais. Depois você ajusta tudo no painel.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <button type="button" onClick={() => setForm((prev) => ({ ...prev, type: 'TECNICO' }))} className={[ 'rounded-3xl border px-4 py-4 text-left', form.type === 'TECNICO' ? 'border-cyan-300/25 bg-cyan-500/10' : 'border-white/10 bg-white/4' ].join(' ')}>
              <div className="font-black text-white">Técnico autônomo</div>
              <div className="mt-2 text-sm text-slate-400">Perfil individual com foco em contato, reputação e área atendida.</div>
            </button>
            <button type="button" onClick={() => setForm((prev) => ({ ...prev, type: 'EMPRESA' }))} className={[ 'rounded-3xl border px-4 py-4 text-left', form.type === 'EMPRESA' ? 'border-cyan-300/25 bg-cyan-500/10' : 'border-white/10 bg-white/4' ].join(' ')}>
              <div className="font-black text-white">Empresa</div>
              <div className="mt-2 text-sm text-slate-400">Página institucional com mais presença, portfólio e visibilidade.</div>
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-200 md:col-span-2">
              Nome do perfil
              <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required />
            </label>
            <label className="grid gap-2 text-sm text-slate-200 md:col-span-2">
              Email
              <div className="flex items-center rounded-2xl border border-white/10 bg-slate-950/45 px-4">
                <Mail className="h-4 w-4 text-slate-500" />
                <input className="h-13 w-full bg-transparent px-3 text-white outline-none" type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} required />
              </div>
            </label>
            <label className="grid gap-2 text-sm text-slate-200">
              Cidade
              <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={form.city} onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))} required />
            </label>
            <label className="grid gap-2 text-sm text-slate-200">
              UF
              <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" maxLength={2} value={form.state} onChange={(event) => setForm((prev) => ({ ...prev, state: event.target.value.toUpperCase() }))} required />
            </label>
            <label className="grid gap-2 text-sm text-slate-200 md:col-span-2">
              Senha
              <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" type="password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} required />
            </label>
          </div>

          {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full cursor-pointer disabled:opacity-70">
            {loading ? 'Criando conta...' : 'Criar conta e abrir painel'}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-5 text-sm text-slate-400">
            Já tem conta? <Link href="/login" className="font-bold text-cyan-200">Entrar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
