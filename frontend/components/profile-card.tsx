import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, Building2, MapPin, MessageCircle, Phone, Star } from 'lucide-react'
import type { PublicProfile } from '@/lib/types'

function planLabel(plan: PublicProfile['plan']) {
  return { FREE: 'Grátis', STARTER: 'Starter', PRO: 'Pro', PREMIUM: 'Premium' }[plan]
}

function planTone(plan: PublicProfile['plan']) {
  return {
    FREE: 'bg-white/5 text-slate-200',
    STARTER: 'bg-cyan-500/12 text-cyan-100',
    PRO: 'bg-violet-500/14 text-violet-100',
    PREMIUM: 'bg-amber-400/14 text-amber-100',
  }[plan]
}

export function ProfileCard({ profile }: { profile: PublicProfile }) {
  return (
    <div className="glass card-hover rounded-[32px] border bg-gradient-to-br from-white/[0.03] via-transparent to-cyan-500/[0.04] p-5 md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="h-18 w-18 shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-slate-900">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-cyan-200">
                <Building2 className="h-7 w-7" />
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{profile.name}</h3>
              <span className={`badge ${planTone(profile.plan)}`}>{planLabel(profile.plan)}</span>
              {profile.verified ? <span className="badge bg-emerald-500/12 text-emerald-200"><BadgeCheck className="h-4 w-4" />Verificado</span> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
              <span className="meta-chip"><MapPin className="h-4 w-4" />{profile.city}/{profile.state}</span>
              <span className="meta-chip"><Star className="h-4 w-4 text-yellow-300" />{profile.averageRating.toFixed(1)} • {profile.reviewsCount} avaliações</span>
            </div>
          </div>
        </div>

        <Link href={`/perfil/${profile.slug}`} className="btn-secondary text-sm">
          Ver perfil <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
        {profile.bio || 'Perfil profissional com atendimento especializado, foco em agilidade, confiança e presença comercial mais forte.'}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {profile.specialties.slice(0, 4).map((item) => (
          <span key={item.id} className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-semibold text-slate-200">
            {item.name}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/perfil/${profile.slug}`} className="btn-primary text-sm">Abrir perfil</Link>
        {profile.contact?.whatsapp ? <a href={`https://wa.me/${profile.contact.whatsapp.replace(/\D/g, '')}`} className="btn-secondary text-sm" target="_blank"><MessageCircle className="h-4 w-4" />WhatsApp</a> : null}
        {profile.contact?.phone ? <a href={`tel:${profile.contact.phone}`} className="btn-secondary text-sm"><Phone className="h-4 w-4" />Ligar</a> : null}
      </div>
    </div>
  )
}
