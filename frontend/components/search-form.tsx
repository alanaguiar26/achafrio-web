'use client'

import { FormEvent, useState } from 'react'
import { Search } from 'lucide-react'
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
    <form onSubmit={submit} className="glass grid gap-3 rounded-[28px] border p-3 md:grid-cols-[1.5fr_0.9fr_1fr_auto]">
      <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white outline-none placeholder:text-slate-500" placeholder="Cidade ou região" value={city} onChange={(event) => setCity(event.target.value)} />
      <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white outline-none placeholder:text-slate-500" placeholder="UF" value={state} onChange={(event) => setState(event.target.value.toUpperCase())} maxLength={2} />
      <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white outline-none placeholder:text-slate-500" placeholder="Especialidade" value={specialty} onChange={(event) => setSpecialty(event.target.value)} />
      <button type="submit" className="btn-primary h-13 cursor-pointer"><Search className="h-4 w-4" />Encontrar</button>
    </form>
  )
}
