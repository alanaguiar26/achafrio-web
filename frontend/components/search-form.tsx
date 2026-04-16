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
    <form onSubmit={submit} className="glass grid gap-3 rounded-[28px] border p-3 md:grid-cols-[1.35fr_0.62fr_1fr_auto] md:gap-2">
      <div className="flex items-center rounded-[18px] border border-white/8 bg-slate-950/40 px-4">
        <MapPin className="h-4 w-4 text-cyan-200/80" />
        <input className="form-field border-0 bg-transparent px-3 shadow-none focus:shadow-none" placeholder="Cidade ou região" value={city} onChange={(event) => setCity(event.target.value)} />
      </div>
      <input className="form-field" placeholder="UF" value={state} onChange={(event) => setState(event.target.value.toUpperCase())} maxLength={2} />
      <div className="flex items-center rounded-[18px] border border-white/8 bg-slate-950/40 px-4">
        <Snowflake className="h-4 w-4 text-violet-200/80" />
        <input className="form-field border-0 bg-transparent px-3 shadow-none focus:shadow-none" placeholder="Especialidade" value={specialty} onChange={(event) => setSpecialty(event.target.value)} />
      </div>
      <button type="submit" className="btn-primary cursor-pointer px-5"><Search className="h-4 w-4" />Encontrar</button>
    </form>
  )
}
