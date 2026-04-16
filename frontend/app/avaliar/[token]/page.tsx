'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { apiClient } from '@/lib/client-auth'

interface TokenInfo {
  token: string
  clientName?: string
  expiresAt: string
  profile: { name: string; slug: string; avatarUrl?: string | null }
}

export default function AvaliarPage() {
  const params = useParams<{ token: string }>()
  const token = params.token
  const [info, setInfo] = useState<TokenInfo | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiClient<TokenInfo>(`/reviews/token/${token}`)
      .then((data) => {
        setInfo(data)
        if (data.clientName) setReviewerName(data.clientName)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Token inválido.'))
  }, [token])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    try {
      await apiClient('/reviews/submit', {
        method: 'POST',
        body: JSON.stringify({ token, reviewerName, rating, comment }),
      })
      setMessage('Avaliação enviada com sucesso e aguardando moderação.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao enviar avaliação.')
    }
  }

  return (
    <div className="container-app py-14">
      <div className="mx-auto max-w-3xl glass rounded-[34px] border p-8 md:p-10">
        <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Avaliação segura</div>
        <h1 className="mt-3 text-4xl font-black text-white">Conte como foi seu atendimento.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">Este link é único e expira em 7 dias. Sua avaliação entra em moderação antes de aparecer publicamente.</p>

        {info ? (
          <div className="mt-6 rounded-[24px] border border-white/8 bg-white/4 p-5">
            <div className="font-black text-white">Profissional avaliado: {info.profile.name}</div>
            <div className="mt-2 text-sm text-slate-400">Expira em {new Date(info.expiresAt).toLocaleString('pt-BR')}</div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-slate-200">
            Seu nome
            <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={reviewerName} onChange={(event) => setReviewerName(event.target.value)} required />
          </label>

          <label className="grid gap-2 text-sm text-slate-200">
            Nota
            <select className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={rating} onChange={(event) => setRating(Number(event.target.value))}>
              {[5, 4, 3, 2, 1].map((score) => <option key={score} value={score}>{score} estrela(s)</option>)}
            </select>
          </label>

          <label className="grid gap-2 text-sm text-slate-200">
            Comentário
            <textarea className="min-h-32 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4 text-white outline-none" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Conte como foi o atendimento, prazo, cordialidade e qualidade do serviço." />
          </label>

          {message ? <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
          {error ? <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

          <button className="btn-primary cursor-pointer">Enviar avaliação</button>
        </form>

        {info ? <Link href={`/perfil/${info.profile.slug}`} className="btn-secondary mt-5">Voltar ao perfil</Link> : null}
      </div>
    </div>
  )
}
