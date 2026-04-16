import { siteConfig } from './site'
import type { PublicProfile, SearchResponse } from './types'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${siteConfig.apiUrl}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })

  if (!response.ok) throw new Error('Falha ao consultar a API.')
  return response.json()
}

export async function getProfiles(searchParams?: Record<string, string | undefined>) {
  const query = new URLSearchParams()
  Object.entries(searchParams ?? {}).forEach(([key, value]) => { if (value) query.set(key, value) })
  return apiFetch<SearchResponse>(`/profiles/list?${query.toString()}`)
}

export async function getPublicProfile(slug: string) {
  return apiFetch<PublicProfile>(`/profiles/public/${slug}`)
}

export async function getReviewToken(token: string) {
  return apiFetch<{ token: string; clientName?: string; expiresAt: string; profile: { name: string; slug: string; avatarUrl?: string | null } }>(`/reviews/token/${token}`)
}
