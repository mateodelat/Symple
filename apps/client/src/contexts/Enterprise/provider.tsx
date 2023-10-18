'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import EnterpriseContext from './context'
import enterpriseService from '@services/enterprises'
import {
  type Enterprise,
  type AppState,
  type EntepriseContextProviderProps
} from '@/types'

export default function EnterpriseContextProvider ({
  children
}: EntepriseContextProviderProps): JSX.Element {
  const { status } = useSession()

  const [enterprises, setEnterprises] = useState<AppState['enterprises']>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const setInitialEnterprises = (enterprises: Enterprise[]): void => {
    setEnterprises(enterprises)
    setIsLoading(false)
  }

  const addEnterprise = (enterprise: Enterprise): void => {
    setEnterprises([...enterprises, enterprise])
  }

  const updateEnterprise = (id: string, enterprise: Enterprise): void => {
    const index = enterprises.findIndex((e) => e.id === id)
    const newEnterprises = [...enterprises]
    newEnterprises[index] = enterprise
    setEnterprises(newEnterprises)
  }

  const deleteEnterprise = (id: string): void => {
    const newEnterprises = enterprises.filter(
      (enterprise) => enterprise.id !== id
    )
    setEnterprises(newEnterprises)
  }

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchEnterprises = async (): Promise<void> => {
        const list = await enterpriseService.getAll()
        setInitialEnterprises(list)
      }
      void fetchEnterprises()
    }
  }, [status])

  return (
    <EnterpriseContext.Provider
      value={{
        enterprises,
        setInitialEnterprises,
        isLoading,
        addEnterprise,
        updateEnterprise,
        deleteEnterprise
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  )
}
