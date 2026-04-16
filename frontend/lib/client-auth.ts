'use client'

import { siteConfig } from './site'

export const AUTH_STORAGE_KEY = 'achafrio_access_token'

export function getAccessToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(AUTH_STORAGE_KEY)
}

export function setAccessToken(token: string) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(AUTH_STORAGE_KEY, token)
}

export function clearAccessToken() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

export async function apiClient<T>(path: string, init?: RequestInit, authenticated = false): Promise<T> {
  const headers = new Headers(init?.headers || {})
  if (!headers.has('Content-Type') && !(init?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (authenticated) {
    const token = getAccessToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${siteConfig.apiUrl}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.error || 'Não foi possível concluir a ação.')
  }

  return data as T
}
