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
    <form onSubmit={submit} className="search-form-v5">
      <label className="search-slot search-slot-lg">
        <span className="search-slot-icon"><MapPin className="h-4 w-4" /></span>
        <div className="search-slot-copy">
          <span className="search-slot-label">Cidade ou região</span>
          <input
            className="search-input"
            placeholder="Ex.: Campinas, Barueri, Curitiba"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </label>

      <label className="search-slot search-slot-sm">
        <div className="search-slot-copy">
          <span className="search-slot-label">UF</span>
          <input className="search-input" placeholder="SP" value={state} onChange={(event) => setState(event.target.value.toUpperCase())} maxLength={2} />
        </div>
      </label>

      <label className="search-slot search-slot-md">
        <span className="search-slot-icon is-violet"><Snowflake className="h-4 w-4" /></span>
        <div className="search-slot-copy">
          <span className="search-slot-label">Especialidade</span>
          <input
            className="search-input"
            placeholder="Instalação, manutenção, câmara fria"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          />
        </div>
      </label>

      <button type="submit" className="btn-primary search-submit">
        <Search className="h-4 w-4" />Encontrar
      </button>
    </form>
  )
}
