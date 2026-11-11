import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/lib/api'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      // On retente une fois les pannes réseau et serveur, jamais les refus (4xx).
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false
        return failureCount < 1
      },
    },
  },
})
