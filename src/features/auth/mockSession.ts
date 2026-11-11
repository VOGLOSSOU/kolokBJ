import type { SessionUser } from '@/types/domain'
import type { Stage } from './stage'

/*
 * Session simulée, utilisée uniquement quand VITE_API_MOCK=true.
 * Permet de construire les écrans avant que le backend soit prêt.
 */

const STORAGE_KEY = 'kolok:mock-session'

const BASE_USER: SessionUser = {
  id: 'mock-user',
  email: 'koffi.test@example.com',
  role: 'USER',
  firstName: 'Koffi',
  photoUrl: null,
  whatsapp: '+2290197000000',
  termsAcceptedAt: '2026-11-11T00:00:00.000Z',
  profileStatus: 'APPROVED',
  rejectionReason: null,
}

export function mockUserForStage(stage: Stage): SessionUser | null {
  switch (stage) {
    case 'anonymous':
      return null
    case 'needs-whatsapp':
      return { ...BASE_USER, whatsapp: null, termsAcceptedAt: null, profileStatus: null }
    case 'needs-profile':
      return { ...BASE_USER, profileStatus: null }
    case 'pending':
      return { ...BASE_USER, profileStatus: 'PENDING' }
    case 'rejected':
      return {
        ...BASE_USER,
        profileStatus: 'REJECTED',
        rejectionReason: 'La photo ne permet pas de te reconnaître.',
      }
    case 'banned':
      return { ...BASE_USER, profileStatus: 'BANNED' }
    case 'approved':
      return BASE_USER
  }
}

export const mockSession = {
  get(): SessionUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as SessionUser) : null
    } catch {
      return null
    }
  },

  set(user: SessionUser | null): void {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Stockage indisponible (navigation privée) : la session simulée ne survivra pas au rechargement.
    }
  },
}
