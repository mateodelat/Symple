import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@styles/global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Symple',
  description: 'Symple es una aplicacion web para las empresas que quieren calificar a sus empleados por medio de mentorias.',
  robots: 'noindex, nofollow'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
