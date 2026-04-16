'use client'

import { useState } from 'react'
import Link from 'next/link'
import { apiClient } from '@/lib/client-auth'

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
    <div className="container-app py-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-[32px] border p-8 md:p-10">
          <div className="eyebrow">Cadastro profissional</div>
          <h1 className="section-title mt-5">Crie um perfil enxuto, confiável e pronto para vender.</h1>
          <p className="section-subtitle mt-5">Comece com o básico agora. Depois você completa bio, contato, especialidades, cidades e assinatura no painel.</p>
          <div className="mt-8 grid gap-4">
            {[
              ['Mais credibilidade', 'Verificação, avaliações moderadas e página pública organizada.'],
              ['Mais presença', 'Planos com contato visível, ranking e mais recursos.'],
              ['Mais controle', 'Painel para editar perfil, assinatura, avaliações e leads.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[24px] border border-white/8 bg-white/4 p-5">
                <div className="font-semibold text-white">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[32px] border p-8 md:p-10">
          <div className="text-3xl font-semibold text-white">Abra sua conta</div>
          <p className="mt-3 text-sm leading-7 text-slate-400">Complete os dados iniciais. O restante você ajusta no painel.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setType('TECNICO')} className={`rounded-[22px] border p-4 text-left ${type === 'TECNICO' ? 'border-cyan-300/24 bg-cyan-500/10' : 'border-white/8 bg-white/4'}`}>
              <div className="font-semibold text-white">Técnico autônomo</div>
              <div className="mt-2 text-sm text-slate-400">Perfil individual com foco em serviço, contato e reputação.</div>
            </button>
            <button type="button" onClick={() => setType('EMPRESA')} className={`rounded-[22px] border p-4 text-left ${type === 'EMPRESA' ? 'border-cyan-300/24 bg-cyan-500/10' : 'border-white/8 bg-white/4'}`}>
              <div className="font-semibold text-white">Empresa</div>
              <div className="mt-2 text-sm text-slate-400">Página institucional com mais presença e visibilidade.</div>
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 grid gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Nome do perfil</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white outline-none" />
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Cidade</label>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">UF</label>
                <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value.toUpperCase() })} maxLength={2} className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Senha</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white outline-none" />
            </div>
            {error ? <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
            <button type="submit" disabled={loading} className="btn-primary mt-2 w-full cursor-pointer disabled:opacity-70">{loading ? 'Criando conta...' : 'Criar conta e abrir painel'}</button>
          </form>

          <div className="mt-5 text-sm text-slate-400">Já tem conta? <Link href="/login" className="font-semibold text-white">Entrar</Link></div>
        </div>
      </div>
    </div>
  )
}
