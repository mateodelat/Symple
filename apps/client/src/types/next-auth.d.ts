import { type SessionUser } from '@/types'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    user: SessionUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
  }
}
