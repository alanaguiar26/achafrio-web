import Link from 'next/link'
import { BadgeCheck, Building2, MapPin, MessageCircle, Phone, Star } from 'lucide-react'
import type { PublicProfile } from '@/lib/types'

function planLabel(plan: PublicProfile['plan']) {
  return { FREE: 'Grátis', STARTER: 'Starter', PRO: 'Pro', PREMIUM: 'Premium' }[plan]
}

export function ProfileCard({ profile }: { profile: PublicProfile }) {
  return (
    <div className="glass card-hover rounded-[30px] border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
            {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-cyan-200"><Building2 className="h-6 w-6" /></div>}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-black text-white">{profile.name}</h3>
              {profile.verified ? <span className="badge bg-emerald-500/12 text-emerald-300"><BadgeCheck className="h-4 w-4" />Verificado</span> : null}
              <span className="badge bg-cyan-500/12 text-cyan-200">{planLabel(profile.plan)}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{profile.city}/{profile.state}</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4" />{profile.averageRating.toFixed(1)} ({profile.reviewsCount} avaliações)</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-300">{profile.bio || 'Perfil profissional com atendimento especializado e foco em qualidade, agilidade e confiança.'}</p>
      <div className="mt-5 flex flex-wrap gap-2">{profile.specialties.slice(0, 4).map((item) => <span key={item.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-100">{item.name}</span>)}</div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/perfil/${profile.slug}`} className="btn-primary text-sm">Ver perfil</Link>
        {profile.contact?.whatsapp ? <a href={`https://wa.me/${profile.contact.whatsapp.replace(/\D/g, '')}`} className="btn-secondary text-sm" target="_blank"><MessageCircle className="h-4 w-4" />WhatsApp</a> : null}
        {profile.contact?.phone ? <a href={`tel:${profile.contact.phone}`} className="btn-secondary text-sm"><Phone className="h-4 w-4" />Ligar</a> : null}
      </div>
    </div>
  )
}
