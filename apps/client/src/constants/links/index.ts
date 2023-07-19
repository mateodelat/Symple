import { NavigationProps } from '@/types'

const headerNavLinks: NavigationProps = {
  topLinks: [
    { href: '/departments', label: 'Departamentos Gerente' },
    { href: '/my-mentoring', label: 'Mis mentorías' },
    { href: '/accounts-to-pay', label: 'Cuentas por pagar' }
  ],
  bottomLinks: [
    { href: '/admin-panel', label: 'Admin panel' },
    { href: '/enterprise-configuration', label: 'Configuración empresa' },
    { href: '/my-profile', label: 'Mi perfil' }
  ]
}

export const links = {
  headerNavLinks
}
