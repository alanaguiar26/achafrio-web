export type Plan = 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM'
export type ProfileType = 'TECNICO' | 'EMPRESA'

export interface PublicProfile {
  id: string
  type: ProfileType
  name: string
  slug: string
  bio?: string | null
  city: string
  state: string
  avatarUrl?: string | null
  plan: Plan
  verified: boolean
  featured: boolean
  averageRating: number
  reviewsCount: number
  viewsCount: number
  specialties: Array<{ id: string; name: string; slug: string }>
  cities: Array<{ id: string; city: string; state: string }>
  photos: Array<{ id: string; url: string }>
  reviews: Array<{ id: string; reviewerName: string; rating: number; comment?: string | null; createdAt: string }>
  contact: null | { phone?: string | null; whatsapp?: string | null; emailContact?: string | null; website?: string | null }
}

export interface SearchResponse {
  page: number
  limit: number
  total: number
  data: PublicProfile[]
}
