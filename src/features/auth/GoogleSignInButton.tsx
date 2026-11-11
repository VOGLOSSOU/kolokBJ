import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { env } from '@/lib/env'
import { useGoogleLogin } from './session'

const GIS_SRC = 'https://accounts.google.com/gsi/client'

let gisLoading: Promise<void> | null = null

/** Charge le script Google une seule fois, et seulement quand un bouton en a besoin. */
function loadGoogleIdentity(): Promise<void> {
  if (window.google?.accounts) return Promise.resolve()

  gisLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GIS_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      gisLoading = null
      script.remove()
      reject(new Error('Chargement de Google Identity Services impossible'))
    }
    document.head.append(script)
  })

  return gisLoading
}

export function GoogleSignInButton() {
  const container = useRef<HTMLDivElement>(null)
  const { mutate: login, isPending, error } = useGoogleLogin()
  const [scriptFailed, setScriptFailed] = useState(false)

  const useRealGoogle = !env.mock && env.googleClientId !== ''

  useEffect(() => {
    if (!useRealGoogle) return

    let cancelled = false
    loadGoogleIdentity()
      .then(() => {
        if (cancelled || !container.current || !window.google) return
        window.google.accounts.id.initialize({
          client_id: env.googleClientId,
          callback: (response) => login(response.credential),
        })
        window.google.accounts.id.renderButton(container.current, {
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          locale: 'fr',
          width: 300,
        })
      })
      .catch(() => {
        if (!cancelled) setScriptFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [useRealGoogle, login])

  return (
    <div className="flex flex-col items-center gap-3">
      {env.mock ? (
        <Button onClick={() => login('mock-credential')} disabled={isPending}>
          Continuer avec Google (démo)
        </Button>
      ) : useRealGoogle ? (
        <div ref={container} className="min-h-11" aria-busy={isPending} />
      ) : (
        <p className="type-small text-danger">
          Connexion indisponible : VITE_GOOGLE_CLIENT_ID n'est pas configuré.
        </p>
      )}

      {scriptFailed && (
        <p role="alert" className="type-small text-danger">
          Impossible de joindre Google. Vérifie ta connexion et recharge la page.
        </p>
      )}
      {error && (
        <p role="alert" className="type-small text-danger">
          {error.message}
        </p>
      )}
    </div>
  )
}
