import { api, ApiError } from '@/lib/api'
import { env } from '@/lib/env'
import type { SessionUser } from '@/types/domain'
import { mockSession, mockUserForStage } from './mockSession'

/*
 * CONTRAT PROVISOIRE : les chemins et les corps de requête ci-dessous sont
 * une proposition, à aligner sur le backend Express. Tout est regroupé ici
 * pour que l'alignement ne touche qu'un seul fichier.
 */

/** Renvoie l'utilisateur connecté, ou null s'il n'y a pas de session. */
export async function fetchSession(): Promise<SessionUser | null> {
  if (env.mock) return mockSession.get()

  try {
    return await api<SessionUser>('/auth/me')
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null
    throw error
  }
}

/** Échange l'ID token Google contre une session (cookie httpOnly posé par Express). */
export async function loginWithGoogle(credential: string): Promise<SessionUser> {
  if (env.mock) {
    const user = mockUserForStage('needs-whatsapp')!
    mockSession.set(user)
    return user
  }

  return api<SessionUser>('/auth/google', { method: 'POST', body: { credential } })
}

export async function logout(): Promise<void> {
  if (env.mock) {
    mockSession.set(null)
    return
  }

  await api<void>('/auth/logout', { method: 'POST' })
}

export type OnboardingInput = {
  /** Numéro au format international (+229...). */
  whatsapp: string
  acceptedTerms: true
}

/** Étape juste après la première connexion : numéro WhatsApp et acceptation des conditions. */
export async function completeOnboarding(input: OnboardingInput): Promise<SessionUser> {
  if (env.mock) {
    const current = mockSession.get() ?? mockUserForStage('needs-whatsapp')!
    const user: SessionUser = {
      ...current,
      whatsapp: input.whatsapp,
      termsAcceptedAt: new Date().toISOString(),
    }
    mockSession.set(user)
    return user
  }

  return api<SessionUser>('/me/onboarding', { method: 'POST', body: input })
}
