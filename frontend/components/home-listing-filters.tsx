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
    const suffix = query.toString() ? `?${query.toString()}#home-destaques` : '#home-destaques'
    router.push(`/${suffix}`)
  }

  function reset() {
    setCity('')
    setState('')
    setSpecialty('')
    router.push('/#home-destaques')
  }

  return (
    <form onSubmit={submit} className="home-listing-filters">
      <label className="listing-filter-field listing-filter-field-lg">
        <span className="listing-filter-icon"><MapPin className="h-4 w-4" /></span>
        <div>
          <span className="listing-filter-label">Cidade ou região</span>
          <input
            className="listing-filter-input"
            placeholder="Ex.: Campinas, Osasco, Belo Horizonte"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </label>

      <label className="listing-filter-field listing-filter-field-sm">
        <span className="listing-filter-icon is-soft"><Filter className="h-4 w-4" /></span>
        <div>
          <span className="listing-filter-label">UF</span>
          <input
            className="listing-filter-input"
            placeholder="SP"
            value={state}
            onChange={(event) => setState(event.target.value.toUpperCase())}
            maxLength={2}
          />
        </div>
      </label>

      <label className="listing-filter-field listing-filter-field-md">
        <span className="listing-filter-icon is-violet"><Snowflake className="h-4 w-4" /></span>
        <div>
          <span className="listing-filter-label">Especialidade</span>
          <input
            className="listing-filter-input"
            placeholder="Instalação, limpeza, câmara fria"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          />
        </div>
      </label>

      <div className="home-listing-actions">
        <button type="submit" className="btn-primary home-listing-submit">
          <Search className="h-4 w-4" />Atualizar destaques
        </button>
        <button type="button" className="btn-secondary text-sm" onClick={reset}>Limpar</button>
      </div>
    </form>
  )
}
