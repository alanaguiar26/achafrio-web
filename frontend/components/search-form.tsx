'use client'

import { FormEvent, useState } from 'react'
import { MapPin, Search, Snowflake } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SearchForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [city, setCity] = useState(params.get('city') ?? '')
  const [state, setState] = useState(params.get('state') ?? '')
  const [specialty, setSpecialty] = useState(params.get('specialty') ?? '')

  function submit(event?: FormEvent) {
    event?.preventDefault()
    const query = new URLSearchParams()
    if (city) query.set('city', city)
    if (state) query.set('state', state)
    if (specialty) query.set('specialty', specialty)
    router.push(query.toString() ? `/buscar?${query.toString()}` : '/buscar')
  }

  return (
    <form onSubmit={submit} className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.35fr_0.5fr_1.05fr_auto] xl:items-stretch">
      <label className="group flex min-w-0 items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-cyan-300/30 hover:bg-white/[0.055]">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-100">
          <MapPin className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">Cidade ou região</span>
          <input
            className="mt-1 w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
            placeholder="Ex.: Campinas, Barueri, Curitiba"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </label>

      <label className="group flex min-w-0 items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-cyan-300/30 hover:bg-white/[0.055]">
        <div className="min-w-0 flex-1">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">UF</span>
          <input
            className="mt-1 w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
            placeholder="SP"
            value={state}
            onChange={(event) => setState(event.target.value.toUpperCase())}
            maxLength={2}
          />
        </div>
      </label>

      <label className="group flex min-w-0 items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-violet-300/30 hover:bg-white/[0.055]">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-400/12 text-violet-100">
          <Snowflake className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100">Serviço</span>
          <input
            className="mt-1 w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
            placeholder="Instalação, manutenção, câmara fria"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          />
        </div>
      </label>

      <button type="submit" className="inline-flex min-h-[62px] items-center justify-center gap-2 rounded-[24px] bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-6 text-base font-semibold text-white shadow-[0_18px_44px_rgba(75,124,255,0.32)] transition hover:-translate-y-0.5 hover:brightness-105">
        <Search className="h-4 w-4" />Encontrar
      </button>
    </form>
  )
}
