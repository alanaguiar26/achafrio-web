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
    router.push(`/buscar?${query.toString()}`)
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-[30px] border border-white/10 bg-slate-950/36 p-3 md:grid-cols-[minmax(0,1.2fr)_110px_minmax(0,1fr)_170px] md:items-center md:gap-3 md:p-3.5">
      <label className="flex min-w-0 items-center gap-3 rounded-[20px] border border-white/8 bg-white/[0.04] px-4">
        <MapPin className="h-4 w-4 shrink-0 text-cyan-200/80" />
        <input className="form-field min-w-0 border-0 bg-transparent px-0 shadow-none focus:shadow-none" placeholder="Cidade ou região" value={city} onChange={(event) => setCity(event.target.value)} />
      </label>
      <input className="form-field" placeholder="UF" value={state} onChange={(event) => setState(event.target.value.toUpperCase())} maxLength={2} />
      <label className="flex min-w-0 items-center gap-3 rounded-[20px] border border-white/8 bg-white/[0.04] px-4">
        <Snowflake className="h-4 w-4 shrink-0 text-violet-200/80" />
        <input className="form-field min-w-0 border-0 bg-transparent px-0 shadow-none focus:shadow-none" placeholder="Especialidade" value={specialty} onChange={(event) => setSpecialty(event.target.value)} />
      </label>
      <button type="submit" className="btn-primary cursor-pointer px-5"><Search className="h-4 w-4" />Encontrar</button>
    </form>
  )
}
