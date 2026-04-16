'use client'

import { FormEvent, useState } from 'react'
import { Filter, MapPin, Search, Snowflake } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export function HomeListingFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const [city, setCity] = useState(params.get('homeCity') ?? '')
  const [state, setState] = useState(params.get('homeState') ?? '')
  const [specialty, setSpecialty] = useState(params.get('homeSpecialty') ?? '')

  function submit(event?: FormEvent) {
    event?.preventDefault()
    const query = new URLSearchParams()
    if (city) query.set('homeCity', city)
    if (state) query.set('homeState', state)
    if (specialty) query.set('homeSpecialty', specialty)
    router.push(query.toString() ? `/?${query.toString()}#home-destaques` : '/#home-destaques')
  }

  function reset() {
    setCity('')
    setState('')
    setSpecialty('')
    router.push('/#home-destaques')
  }

  return (
    <form onSubmit={submit} className="grid gap-3 lg:grid-cols-[1.2fr_0.45fr_1fr_auto_auto] lg:items-stretch">
      <label className="flex min-w-0 items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-100">
          <MapPin className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">Cidade ou região</span>
          <input
            className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="Ex.: Campinas, Osasco, Belo Horizonte"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </label>

      <label className="flex min-w-0 items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-slate-200">
          <Filter className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">UF</span>
          <input
            className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="SP"
            value={state}
            onChange={(event) => setState(event.target.value.toUpperCase())}
            maxLength={2}
          />
        </div>
      </label>

      <label className="flex min-w-0 items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-400/12 text-violet-100">
          <Snowflake className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">Especialidade</span>
          <input
            className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="Instalação, limpeza, câmara fria"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          />
        </div>
      </label>

      <button type="submit" className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-[22px] bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(75,124,255,0.28)] transition hover:-translate-y-0.5 hover:brightness-105">
        <Search className="h-4 w-4" />Atualizar
      </button>
      <button type="button" className="inline-flex min-h-[58px] items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.07]" onClick={reset}>
        Limpar
      </button>
    </form>
  )
}
