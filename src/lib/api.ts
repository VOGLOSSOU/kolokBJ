import { env } from '@/lib/env'

/** Erreur renvoyée par l'API (statut HTTP hors 2xx) ou par le réseau (status 0). */
export class ApiError extends Error {
  readonly status: number
  readonly code: string | undefined

  constructor(status: number, message: string, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
}

const FALLBACK_MESSAGE = 'Une erreur est survenue. Réessaie dans un instant.'
const OFFLINE_MESSAGE = 'Connexion impossible. Vérifie ton réseau et réessaie.'

/**
 * Seul point de passage vers l'API Express.
 * La session vit dans un cookie httpOnly : on envoie toujours les cookies,
 * et le front ne manipule jamais de token.
 */
export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options

  let response: Response
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      method,
      signal,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError(0, OFFLINE_MESSAGE)
  }

  const payload: unknown =
    response.status === 204 ? undefined : await response.json().catch(() => undefined)

  if (!response.ok) {
    const data = (payload ?? {}) as { message?: unknown; code?: unknown }
    throw new ApiError(
      response.status,
      typeof data.message === 'string' ? data.message : FALLBACK_MESSAGE,
      typeof data.code === 'string' ? data.code : undefined,
    )
  }

  return payload as T
}
