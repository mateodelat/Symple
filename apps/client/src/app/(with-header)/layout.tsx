import { Header } from '@components/index'
import React from 'react'

export default function WithHeaderLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
