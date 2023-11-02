'use client'

import { useEnterpriseContext } from '@contexts/Enterprise/context'
import List from '@components/shared/List'
import CardEnterpriseEdit from '@components/modules/Enterprise/CardEnterpriseEdit'
import { useSession } from 'next-auth/react'

export default function EnterpriseList (): JSX.Element {
  const { enterprises, isLoading } = useEnterpriseContext()
  const { data: session, status } = useSession()
  return (
    <>
      {isLoading
        ? (
        <h2>Cargando empresas...</h2>
          )
        : (
        <>
          <List
            list={enterprises}
            newElement="Nueva empresa"
            newElementPage={'/admin-panel/enterprise/new'}
            listEmptyMessage="No cuentas con empresas a tu cargo..."
            canCreateElement={status === 'authenticated' && session.user.role === 'admin'}
            Card={CardEnterpriseEdit}
          />
        </>
          )}
    </>
  )
}
