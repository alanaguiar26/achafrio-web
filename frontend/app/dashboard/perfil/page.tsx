'use client'

import { FormEvent, useEffect, useState } from 'react'
import { apiClient } from '@/lib/client-auth'

interface Specialty { id: string; name: string; specialtyId?: string; specialty?: { id: string; name: string } }
interface City { city: string; state: string }
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
  specialties: Specialty[]
  cities: Array<{ city: string; state: string }>
}

export default function DashboardPerfilPage() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', bio: '', phone: '', whatsapp: '', emailContact: '', website: '', city: '', state: '', zipCode: '', address: '', specialties: '', cities: '',
  })

  useEffect(() => {
    apiClient<ProfileResponse>('/profiles/me', undefined, true)
      .then((profile) => {
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
          specialties: (profile.specialties || []).map((item) => item.specialty?.id || item.id).join(', '),
          cities: (profile.cities || []).map((item) => `${item.city}/${item.state}`).join(', '),
        })
        setLoaded(true)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar perfil.'))
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)

    try {
      const specialties = form.specialties.split(',').map((item) => item.trim()).filter(Boolean)
      const cities = form.cities.split(',').map((item) => item.trim()).filter(Boolean).map((item) => {
        const [city, state] = item.split('/')
        return { city: city?.trim() || '', state: state?.trim() || '' }
      }).filter((item) => item.city && item.state)

      await apiClient('/profiles/me', {
        method: 'PUT',
        body: JSON.stringify({
          ...form,
          state: form.state.toUpperCase(),
          specialties,
          cities,
        }),
      }, true)
      setMessage('Perfil atualizado com sucesso.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao salvar perfil.')
    }
  }

  if (!loaded && !error) return <div className="glass rounded-[28px] border p-6 text-sm text-slate-300">Carregando perfil...</div>

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[30px] border p-7 md:p-8">
      <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Meu perfil</div>
      <h1 className="mt-3 text-3xl font-black text-white">Edite as informações que aparecem na busca e na página pública.</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">Para simplificar o MVP, especialidades e cidades adicionais podem ser informadas em lista separada por vírgulas. Depois você pode ligar isso a seletores administráveis.</p>

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
        <label className="grid gap-2 text-sm text-slate-200 md:col-span-2">
          IDs das especialidades separados por vírgula
          <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={form.specialties} onChange={(event) => setForm((prev) => ({ ...prev, specialties: event.target.value }))} placeholder="ex.: clw..., clx..." />
        </label>
        <label className="grid gap-2 text-sm text-slate-200 md:col-span-2">
          Cidades atendidas separadas por vírgula no formato Cidade/UF
          <input className="h-13 rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-white outline-none" value={form.cities} onChange={(event) => setForm((prev) => ({ ...prev, cities: event.target.value }))} placeholder="Campinas/SP, Hortolândia/SP" />
        </label>
      </div>

      {message ? <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
      {error ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}

      <button className="btn-primary mt-6 cursor-pointer">Salvar alterações</button>
    </form>
  )
}
