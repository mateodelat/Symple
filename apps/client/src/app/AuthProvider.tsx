'use client'

import { SessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

export function AuthProvider ({ children }: Props): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>
}
