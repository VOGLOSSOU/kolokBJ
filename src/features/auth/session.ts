import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { completeOnboarding, fetchSession, loginWithGoogle, logout } from './api'

export const SESSION_QUERY_KEY = ['session'] as const

/** L'utilisateur connecté (null si personne). Source de vérité unique pour toute l'appli. */
export function useSession() {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}

export function useGoogleLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (user) => queryClient.setQueryData(SESSION_QUERY_KEY, user),
  })
}

export function useCompleteOnboarding() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (user) => queryClient.setQueryData(SESSION_QUERY_KEY, user),
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.google?.accounts.id.disableAutoSelect()
      // La session passe à null (les gardes redirigent aussitôt), puis on retire
      // tout le reste du cache : aucune donnée de l'ancien compte ne doit rester en mémoire.
      // Ne pas utiliser queryClient.clear() : il détache les écrans de la session,
      // qui ne verraient plus la déconnexion.
      queryClient.setQueryData(SESSION_QUERY_KEY, null)
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== SESSION_QUERY_KEY[0],
      })
    },
  })
}
