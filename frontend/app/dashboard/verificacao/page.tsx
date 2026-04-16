'use client'

import { FormEvent, useState } from 'react'
import { apiClient } from '@/lib/client-auth'

export default function DashboardVerificacaoPage() {
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!documentFile) return setError('Envie o documento para continuar.')

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('document', documentFile)
      if (selfieFile) formData.append('selfie', selfieFile)
      await apiClient('/profiles/me/verification', { method: 'POST', body: formData }, true)
      setMessage('Solicitação de verificação enviada para análise do admin.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao enviar verificação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="glass rounded-[30px] border p-7">
        <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Verificação de perfil</div>
        <h1 className="mt-3 text-3xl font-black text-white">Ganhe mais confiança e suba na busca.</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Perfis verificados passam mais segurança para o cliente e entram melhor no ranking. O fluxo aceita documento e selfie opcional, com decisão manual do admin e notificação transacional na aprovação ou rejeição.
        </p>
        <div className="mt-6 grid gap-3">
          {[
            'Envio disponível a partir do plano Starter.',
            'Documento e selfie são gravados em /uploads com acesso restrito no admin.',
            'A aprovação muda o selo público e melhora a ordenação do perfil.',
          ].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-200">{item}</div>)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-[30px] border p-7">
        <div className="text-xl font-black text-white">Enviar documentos</div>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-slate-200">
            Documento (obrigatório)
            <input className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4 text-white" type="file" accept="image/*,.pdf" onChange={(event) => setDocumentFile(event.target.files?.[0] ?? null)} required />
          </label>
          <label className="grid gap-2 text-sm text-slate-200">
            Selfie com documento (opcional)
            <input className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4 text-white" type="file" accept="image/*" onChange={(event) => setSelfieFile(event.target.files?.[0] ?? null)} />
          </label>
        </div>
        {message ? <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
        {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        <button disabled={loading} className="btn-primary mt-6 cursor-pointer disabled:opacity-70">{loading ? 'Enviando...' : 'Solicitar verificação'}</button>
      </form>
    </div>
  )
}
