const fcfa = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })

/** 15000 -> "15 000 FCFA" */
export function formatFcfa(amount: number): string {
  return `${fcfa.format(amount)} FCFA`
}

/**
 * Ramène un numéro béninois saisi librement au format international.
 * Accepte l'ancien format à 8 chiffres (préfixé par 01) et le format à 10 chiffres.
 * "97 00 00 00", "0197000000", "+229 01 97 00 00 00" -> "+2290197000000"
 * Renvoie null si le numéro n'est pas un numéro béninois valide.
 */
export function normalizeBeninPhone(input: string): string | null {
  let digits = input.replace(/\D/g, '')
  if (digits.startsWith('00229')) digits = digits.slice(5)
  else if (digits.startsWith('229') && digits.length > 10) digits = digits.slice(3)

  if (digits.length === 8) digits = `01${digits}`
  if (digits.length !== 10 || !digits.startsWith('01')) return null

  return `+229${digits}`
}

/** "+2290197000000" -> "+229 01 97 00 00 00" */
export function formatBeninPhone(phone: string): string {
  const normalized = normalizeBeninPhone(phone)
  if (!normalized) return phone
  const pairs = normalized.slice(4).match(/\d{2}/g) ?? []
  return `+229 ${pairs.join(' ')}`
}

/** Lien direct pour ouvrir la discussion WhatsApp, avec un message prérempli optionnel. */
export function whatsappLink(phone: string, text?: string): string {
  const digits = (normalizeBeninPhone(phone) ?? phone).replace(/\D/g, '')
  const query = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${digits}${query}`
}
