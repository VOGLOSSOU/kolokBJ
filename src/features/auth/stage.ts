import type { SessionUser } from '@/types/domain'

/**
 * Où en est l'utilisateur dans le parcours. C'est l'étape, et elle seule,
 * qui décide des écrans accessibles (voir app/guards.tsx).
 */
export type Stage =
  | 'anonymous'
  | 'needs-whatsapp'
  | 'needs-profile'
  | 'pending'
  | 'rejected'
  | 'banned'
  | 'approved'

export function stageOf(user: SessionUser | null): Stage {
  if (!user) return 'anonymous'
  if (user.profileStatus === 'BANNED') return 'banned'
  if (!user.whatsapp || !user.termsAcceptedAt) return 'needs-whatsapp'

  switch (user.profileStatus) {
    case null:
      return 'needs-profile'
    case 'PENDING':
      return 'pending'
    case 'REJECTED':
      return 'rejected'
    case 'APPROVED':
      return 'approved'
  }
}

/** L'écran sur lequel on renvoie un utilisateur qui n'a rien à faire là où il est. */
export const STAGE_HOME: Record<Stage, string> = {
  anonymous: '/',
  'needs-whatsapp': '/bienvenue',
  'needs-profile': '/profil/creer',
  pending: '/en-attente',
  rejected: '/profil-refuse',
  banned: '/compte-banni',
  approved: '/decouvrir',
}
