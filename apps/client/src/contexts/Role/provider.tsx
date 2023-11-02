'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import RoleContext from './context'
import {
  type RoleContextProviderProps,
  type AppState,
  type Role
} from '@/types'
import rolesService from '@/services/roles'

export default function RoleContextProvider ({ children }: RoleContextProviderProps): JSX.Element {
  const { status } = useSession()

  const [roles, setRoles] = useState<AppState['roles']>([])
  const [department, setDepartment] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleDepartmentChange = (department: string): void => {
    setDepartment(department)
  }

  const setInitialRoles = (roles: Role[]): void => {
    setRoles(roles)
    setIsLoading(false)
  }

  const addRole = (role: Role): void => {
    setRoles([...roles, role])
  }

  const updateRole = (role: Role): void => {
    setRoles((prev) => {
      const newRoles = [...prev]
      const index = newRoles.findIndex((e) => e.id === role.id)
      newRoles[index] = role
      return newRoles
    })
  }

  const deleteRole = (id: string): void => {
    const newRoles = roles.filter(
      (role) => role.id !== id
    )
    setRoles(newRoles)
  }

  useEffect(() => {
    if (department === '' && status !== 'authenticated') return
    const fetchRoles = async (): Promise<void> => {
      const list = await rolesService.getAll(department)
      setInitialRoles(list)
    }
    void fetchRoles()
  }, [department])

  return (
    <RoleContext.Provider
      value={{
        roles,
        department,
        handleDepartmentChange,
        setInitialRoles,
        isLoading,
        addRole,
        updateRole,
        deleteRole
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}
