'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { apiClient, setAccessToken } from '@/lib/client-auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient<{ accessToken: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setAccessToken(response.accessToken)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao entrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-app py-14">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass rounded-[32px] border p-8 md:p-10">
          <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Entrar</div>
          <h1 className="mt-4 text-4xl font-black text-white">Acesse seu painel e gerencie seu crescimento.</h1>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Edite seu perfil, solicite avaliações, acompanhe orçamento e faça upgrade de plano sem depender de plugins extras.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              'Atualize dados, fotos, especialidades e cidades atendidas.',
              'Receba notificações transacionais via n8n + Evolution.',
              'Gerencie verificação, leads, avaliações e assinatura.',
            ].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200">{item}</div>)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-[32px] border p-8 md:p-10">
          <div className="text-2xl font-black text-white">Bem-vindo de volta</div>
          <p className="mt-2 text-sm leading-7 text-slate-400">Use o email cadastrado para entrar no painel do AchaFrio.</p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-200">
              Email
              <div className="flex items-center rounded-2xl border border-white/10 bg-slate-950/45 px-4">
                <Mail className="h-4 w-4 text-slate-500" />
                <input className="h-13 w-full bg-transparent px-3 text-white outline-none" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
            </label>

            <label className="grid gap-2 text-sm text-slate-200">
              Senha
              <div className="flex items-center rounded-2xl border border-white/10 bg-slate-950/45 px-4">
                <LockKeyhole className="h-4 w-4 text-slate-500" />
                <input className="h-13 w-full bg-transparent px-3 text-white outline-none" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </div>
            </label>
          </div>

          {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full cursor-pointer disabled:opacity-70">
            {loading ? 'Entrando...' : 'Entrar agora'}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-5 text-sm text-slate-400">
            Ainda não tem conta? <Link href="/cadastro" className="font-bold text-cyan-200">Criar cadastro</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
