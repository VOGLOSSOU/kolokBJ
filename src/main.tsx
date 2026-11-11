import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { DevBar } from '@/app/DevBar'
import { queryClient } from '@/app/queryClient'
import { router } from '@/app/router'
import { env } from '@/lib/env'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {env.mock && <DevBar />}
    </QueryClientProvider>
  </StrictMode>,
)
