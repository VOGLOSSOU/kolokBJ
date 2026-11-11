/*
 * Types métier partagés avec l'API.
 * CONTRAT PROVISOIRE : à aligner sur le backend Express dès qu'il est figé.
 */

export type ProfileStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'BANNED'

export type Role = 'USER' | 'ADMIN'

/** L'utilisateur connecté, tel que renvoyé par la route de session. */
export type SessionUser = {
  id: string
  email: string
  role: Role
  firstName: string | null
  photoUrl: string | null
  /** Format international (+229...). null tant que l'étape WhatsApp n'est pas faite. */
  whatsapp: string | null
  termsAcceptedAt: string | null
  /** null tant que le profil colocataire n'a pas été rempli. */
  profileStatus: ProfileStatus | null
  /** Motif donné par l'admin quand le profil est rejeté. */
  rejectionReason: string | null
}
