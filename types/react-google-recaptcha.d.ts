declare module 'react-google-recaptcha' {
  import * as React from 'react'

  export interface ReCAPTCHAProps {
    sitekey: string
    onChange?: (token: string | null) => void
    onExpired?: () => void
    onErrored?: () => void
    className?: string
    style?: React.CSSProperties
  }

  export interface ReCAPTCHAInstance {
    reset(): void
    execute(): void
    getValue(): string | null
  }

  const ReCAPTCHA: React.ForwardRefExoticComponent<
    ReCAPTCHAProps & React.RefAttributes<ReCAPTCHAInstance>
  >

  export default ReCAPTCHA
}
