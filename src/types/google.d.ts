// Sous-ensemble de Google Identity Services utilisé par l'appli.
// https://developers.google.com/identity/gsi/web/reference/js-reference

type GoogleCredentialResponse = {
  /** ID token (JWT) à faire vérifier par Express. */
  credential: string
}

type GoogleIdConfiguration = {
  client_id: string
  callback: (response: GoogleCredentialResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
}

type GoogleButtonConfiguration = {
  type?: 'standard' | 'icon'
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  size?: 'large' | 'medium' | 'small'
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
  shape?: 'rectangular' | 'pill' | 'circle' | 'square'
  logo_alignment?: 'left' | 'center'
  width?: number
  locale?: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfiguration) => void
          renderButton: (parent: HTMLElement, options: GoogleButtonConfiguration) => void
          disableAutoSelect: () => void
        }
      }
    }
  }
}

export {}
