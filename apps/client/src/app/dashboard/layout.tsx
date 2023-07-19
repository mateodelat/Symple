import { Header } from '@components/index'

export default function DashboardLayout ({ children }): JSX.Element {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
