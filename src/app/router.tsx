import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { FullPageLoader } from '@/components/FullPageLoader'
import { AppShell } from '@/components/layout/AppShell'
import { AdminGate, StageGate } from './guards'
import { RouteError } from './RouteError'

/** Chaque page est un fichier JS séparé, téléchargé seulement quand on y va (3G). */
function page(load: () => Promise<{ default: ComponentType }>) {
  return async () => ({ Component: (await load()).default })
}

export const router = createBrowserRouter([
  {
    HydrateFallback: FullPageLoader,
    ErrorBoundary: RouteError,
    children: [
      // Pages publiques : visibles par tout le monde, sans session ni backend.
      { path: '/', lazy: page(() => import('@/pages/LandingPage')) },
      { path: '/conditions', lazy: page(() => import('@/pages/TermsPage')) },
      { path: '/confidentialite', lazy: page(() => import('@/pages/PrivacyPage')) },

      // Chaque étape du parcours a son écran, et n'a accès qu'à lui.
      {
        element: <StageGate allow={['needs-whatsapp']} />,
        children: [{ path: '/bienvenue', lazy: page(() => import('@/pages/OnboardingPage')) }],
      },
      {
        element: <StageGate allow={['needs-profile']} />,
        children: [{ path: '/profil/creer', lazy: page(() => import('@/pages/ProfileFormPage')) }],
      },
      {
        element: <StageGate allow={['pending']} />,
        children: [{ path: '/en-attente', lazy: page(() => import('@/pages/PendingPage')) }],
      },
      {
        element: <StageGate allow={['rejected']} />,
        children: [
          { path: '/profil-refuse', lazy: page(() => import('@/pages/RejectedPage')) },
          { path: '/profil/corriger', lazy: page(() => import('@/pages/ProfileFormPage')) },
        ],
      },
      {
        element: <StageGate allow={['banned']} />,
        children: [{ path: '/compte-banni', lazy: page(() => import('@/pages/BannedPage')) }],
      },

      // L'appli elle-même : profils validés uniquement.
      {
        element: <StageGate allow={['approved']} />,
        children: [
          {
            element: <AppShell />,
            children: [
              { path: '/decouvrir', lazy: page(() => import('@/pages/DiscoverPage')) },
              { path: '/profils/:profileId', lazy: page(() => import('@/pages/ProfileDetailPage')) },
              { path: '/demandes', lazy: page(() => import('@/pages/RequestsPage')) },
              { path: '/moi', lazy: page(() => import('@/pages/MyProfilePage')) },
            ],
          },
        ],
      },

      // Back-office
      {
        path: '/admin',
        element: <AdminGate />,
        children: [
          {
            lazy: page(() => import('@/pages/admin/AdminLayout')),
            children: [
              { index: true, lazy: page(() => import('@/pages/admin/ValidationQueuePage')) },
              { path: 'signalements', lazy: page(() => import('@/pages/admin/ReportsPage')) },
              { path: 'tableau-de-bord', lazy: page(() => import('@/pages/admin/DashboardPage')) },
              { path: 'journal', lazy: page(() => import('@/pages/admin/AuditLogPage')) },
            ],
          },
        ],
      },

      { path: '*', lazy: page(() => import('@/pages/NotFoundPage')) },
    ],
  },
])
