'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { apiClient } from '@/lib/client-auth'

interface SpecialtyOption { id: string; name: string; slug: string }
interface SpecialtyValue { id: string; specialtyId?: string; specialty?: { id: string; name: string } }
interface ProfileResponse {
  name: string
  bio?: string | null
  phone?: string | null
  whatsapp?: string | null
  emailContact?: string | null
  website?: string | null
  city: string
  state: string
  zipCode?: string | null
  address?: string | null
  specialties: SpecialtyValue[]
  cities: Array<{ city: string; state: string }>
}

function parseCities(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [city, state] = item.split('/')
      return { city: city?.trim() || '', state: state?.trim() || '' }
    })
    .filter((item) => item.city && item.state)
}

export default function DashboardPerfilPage() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [specialtiesOptions, setSpecialtiesOptions] = useState<SpecialtyOption[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [form, setForm] = useState({
    name: '', bio: '', phone: '', whatsapp: '', emailContact: '', website: '', city: '', state: '', zipCode: '', address: '', cities: '',
  })

  useEffect(() => {
    Promise.all([
      apiClient<ProfileResponse>('/profiles/me', undefined, true),
      apiClient<SpecialtyOption[]>('/profiles/specialties'),
    ])
      .then(([profile, specialties]) => {
        setSpecialtiesOptions(specialties)
        setSelectedSpecialties((profile.specialties || []).map((item) => item.specialty?.id || item.id))
        setForm({
          name: profile.name || '',
          bio: profile.bio || '',
          phone: profile.phone || '',
          whatsapp: profile.whatsapp || '',
          emailContact: profile.emailContact || '',
          website: profile.website || '',
          city: profile.city || '',
          state: profile.state || '',
          zipCode: profile.zipCode || '',
          address: profile.address || '',
          cities: (profile.cities || []).map((item) => `${item.city}/${item.state}`).join(', '),
        })
        setLoaded(true)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar perfil.'))
  }, [])

  const selectedCitiesPreview = useMemo(() => parseCities(form.cities), [form.cities])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)

    try {
      await apiClient('/profiles/me', {
        method: 'PUT',
        body: JSON.stringify({
          ...form,
          state: form.state.toUpperCase(),
          specialties: selectedSpecialties,
          cities: parseCities(form.cities),
        }),
      }, true)
      setMessage('Perfil atualizado com sucesso.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao salvar perfil.')
    }
  }

  function toggleSpecialty(id: string) {
    setSelectedSpecialties((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
  }

  if (!loaded && !error) return <div className="glass rounded-[28px] border p-6 text-sm text-slate-300">Carregando perfil...</div>

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[30px] border p-7 md:p-8">
      <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Meu perfil</div>
      <h1 className="mt-3 text-3xl font-semibold text-white">Edite o que realmente aparece para o cliente.</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">Deixei essa tela mais prática: especialidades agora viraram seleção visual e as cidades continuam no formato Cidade/UF, separadas por vírgula.</p>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {[
          ['name', 'Nome do perfil'],
          ['city', 'Cidade base'],
          ['state', 'UF'],
          ['phone', 'Telefone'],
          ['whatsapp', 'WhatsApp'],
          ['emailContact', 'Email comercial'],
          ['website', 'Website'],
          ['zipCode', 'CEP'],
          ['address', 'Endereço'],
        ].map(([field, label]) => (
          <label key={field} className="grid gap-2 text-sm text-slate-200">
            {label}
            <input
              className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none"
              value={(form as Record<string, string>)[field]}
              onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
            />
          </label>
        ))}

        <label className="grid gap-2 text-sm text-slate-200 md:col-span-2">
          Bio
          <textarea className="min-h-32 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4 text-white outline-none" value={form.bio} onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} />
        </label>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="text-sm font-semibold text-slate-200">Especialidades</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {specialtiesOptions.map((item) => {
              const active = selectedSpecialties.includes(item.id)
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleSpecialty(item.id)}
                  className={[
                    'rounded-full border px-4 py-2 text-sm transition',
                    active ? 'border-cyan-300/30 bg-cyan-500/12 text-white' : 'border-white/10 bg-white/4 text-slate-300 hover:bg-white/7',
                  ].join(' ')}
                >
                  {item.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/8 bg-white/4 p-5">
          <div className="text-sm font-semibold text-slate-200">Cidades atendidas</div>
          <label className="mt-3 grid gap-2 text-sm text-slate-200">
            Informe no formato Cidade/UF, separadas por vírgula
            <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={form.cities} onChange={(event) => setForm((prev) => ({ ...prev, cities: event.target.value }))} placeholder="Campinas/SP, Hortolândia/SP" />
          </label>
          {selectedCitiesPreview.length ? <div className="mt-3 flex flex-wrap gap-2">{selectedCitiesPreview.map((item) => <span key={`${item.city}-${item.state}`} className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-slate-200">{item.city}/{item.state}</span>)}</div> : <div className="mt-3 text-xs text-slate-500">Nenhuma cidade adicional informada.</div>}
        </div>
      </div>

      {message ? <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
      {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

      <button className="btn-primary mt-6 cursor-pointer">Salvar alterações</button>
    </form>
  )
}
