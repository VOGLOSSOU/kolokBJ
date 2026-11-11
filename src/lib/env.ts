export const env = {
  apiUrl: (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, ''),
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  /** Pas de backend : la session est simulée (voir features/auth/mockSession.ts). */
  mock: import.meta.env.VITE_API_MOCK === 'true',
} as const
