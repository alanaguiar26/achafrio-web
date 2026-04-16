import Link from 'next/link'
import { BadgeCheck, Globe, MapPin, MessageCircle, Phone, Quote, Star } from 'lucide-react'
import { getPublicProfile } from '@/lib/api'
import { Surface } from '@/components/ui'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return { title: `Perfil ${slug}` }
}

export default async function PerfilPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = await getPublicProfile(slug)

  return (
    <div className="container-app py-14">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Surface className="sticky top-24 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="h-28 w-28 overflow-hidden rounded-[26px] border border-white/10 bg-slate-900">
              {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-cyan-200">{profile.name.slice(0, 1)}</div>}
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="badge bg-cyan-500/14 text-cyan-100">{profile.plan}</span>
              {profile.verified ? <span className="badge bg-emerald-500/14 text-emerald-300"><BadgeCheck className="h-4 w-4" />Verificado</span> : null}
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-white">{profile.name}</h1>
            <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400"><MapPin className="h-4 w-4" />{profile.city}/{profile.state}</div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"><Star className="h-4 w-4 text-yellow-300" />{profile.averageRating.toFixed(1)} de média • {profile.reviewsCount} avaliações</div>

            <div className="mt-6 grid w-full gap-3">
              {profile.contact?.whatsapp ? <a href={`https://wa.me/${profile.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" className="btn-primary"><MessageCircle className="h-4 w-4" />Chamar no WhatsApp</a> : null}
              {profile.contact?.phone ? <a href={`tel:${profile.contact.phone}`} className="btn-secondary"><Phone className="h-4 w-4" />{profile.contact.phone}</a> : null}
              {profile.contact?.website ? <a href={profile.contact.website} className="btn-secondary" target="_blank"><Globe className="h-4 w-4" />Visitar site</a> : null}
              {(profile.plan === 'PRO' || profile.plan === 'PREMIUM') ? <Link href={`/#quote-${profile.slug}`} className="btn-secondary"><Quote className="h-4 w-4" />Solicitar orçamento</Link> : null}
            </div>
          </div>
        </Surface>

        <div className="grid gap-6">
          <Surface>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Sobre</div>
            <p className="mt-4 text-base leading-8 text-slate-300">{profile.bio || 'Perfil profissional ativo na plataforma AchaFrio, pronto para atender clientes com foco em qualidade, confiança e agilidade.'}</p>
          </Surface>

          <Surface>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Especialidades</div>
            <div className="mt-4 flex flex-wrap gap-3">{profile.specialties.map((item) => <span key={item.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200">{item.name}</span>)}</div>
          </Surface>

          {profile.photos.length ? (
            <Surface>
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Galeria</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">{profile.photos.map((photo) => <img key={photo.id} src={photo.url} alt={profile.name} className="h-64 w-full rounded-[24px] object-cover" />)}</div>
            </Surface>
          ) : null}

          <Surface>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Cidades atendidas</div>
            <div className="mt-4 flex flex-wrap gap-3">{[{ city: profile.city, state: profile.state }, ...profile.cities].map((item, index) => <span key={`${item.city}-${item.state}-${index}`} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">{item.city}/{item.state}</span>)}</div>
          </Surface>

          <Surface>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Avaliações</div>
            <div className="mt-4 grid gap-4">
              {profile.reviews.length ? profile.reviews.map((review) => (
                <div key={review.id} className="rounded-[24px] border border-white/8 bg-white/4 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-medium text-white">{review.reviewerName}</div>
                    <div className="text-sm text-yellow-300">{'★'.repeat(review.rating)}</div>
                  </div>
                  {review.comment ? <p className="mt-3 text-sm leading-7 text-slate-300">{review.comment}</p> : null}
                </div>
              )) : <div className="rounded-[24px] border border-dashed border-white/10 p-5 text-sm text-slate-400">Este perfil ainda não tem avaliações aprovadas.</div>}
            </div>
          </Surface>
        </div>
      </div>
    </div>
  )
}
