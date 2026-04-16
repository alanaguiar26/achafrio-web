'use client'

import { useEffect, useMemo, useState } from 'react'
import { apiClient, clearAccessToken, getAccessToken, onAuthChange } from './client-auth'

export interface SessionUser {
  id: string
  email: string
  role: 'ADMIN' | 'USER'
  profile?: {
    id: string
    name: string
    slug: string
    plan: 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM'
  } | null
}

export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    const token = getAccessToken()
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const me = await apiClient<SessionUser>('/auth/me', undefined, true)
      setUser(me)
    } catch {
      clearAccessToken()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    return onAuthChange(load)
  }, [])

  return useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'ADMIN',
  }), [loading, user])
}
