'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { apiClient, setAccessToken } from '@/lib/client-auth'

const bullets = [
  { text: 'Atualize dados, fotos, cidades e especialidades sem depender de plugins aleatórios.', icon: ShieldCheck },
  { text: 'Acompanhe assinatura, reputação e oportunidades dentro do mesmo painel.', icon: Sparkles },
  { text: 'Receba avisos e leads por fluxos transacionais com n8n e Evolution.', icon: Zap },
]

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
    <div className="container-app py-12 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="glass tone-lilac rounded-[34px] border p-7 md:p-10">
          <div className="eyebrow">Entrar</div>
          <h1 className="section-title-sm mt-5 max-w-[13ch]">Volte para o seu painel e continue melhorando sua vitrine profissional.</h1>
          <p className="section-subtitle mt-5">
            O acesso coloca você de volta no centro da operação: perfil, reputação, orçamentos, assinatura e próximos passos do crescimento.
          </p>
          <div className="mt-8 grid gap-4">
            {bullets.map((item) => (
              <div key={item.text} className="surface-inset flex gap-4 p-5">
                <div className="mt-1 text-cyan-200"><item.icon className="h-5 w-5" /></div>
                <div className="text-sm leading-7 text-slate-300">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-[34px] border p-7 md:p-10">
          <div className="text-3xl font-black tracking-[-0.04em] text-white">Bem-vindo de volta</div>
          <p className="mt-3 text-sm leading-7 text-slate-400">Use o email cadastrado para abrir o painel do AchaFrio.</p>

          <div className="mt-7 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-200">
              Email
              <div className="flex items-center rounded-[18px] border border-white/10 bg-slate-950/42 px-4">
                <Mail className="h-4 w-4 text-cyan-200/80" />
                <input className="form-field border-0 bg-transparent px-3 shadow-none focus:shadow-none" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
            </label>

            <label className="grid gap-2 text-sm text-slate-200">
              Senha
              <div className="flex items-center rounded-[18px] border border-white/10 bg-slate-950/42 px-4">
                <LockKeyhole className="h-4 w-4 text-violet-200/80" />
                <input className="form-field border-0 bg-transparent px-3 shadow-none focus:shadow-none" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </div>
            </label>
          </div>

          {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full cursor-pointer disabled:opacity-70">
            {loading ? 'Entrando...' : 'Entrar agora'}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-5 text-sm text-slate-400">
            Ainda não tem conta? <Link href="/cadastro" className="font-semibold text-cyan-200">Criar cadastro</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
