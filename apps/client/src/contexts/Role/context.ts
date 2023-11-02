'use client'

import { createContext, useContext } from 'react'
import { type RoleContextType } from '@/types'

const RoleContext = createContext<RoleContextType>({
  roles: [],
  department: '',
  handleDepartmentChange: (department) => {},
  setInitialRoles: (roles) => {},
  isLoading: true,
  addRole: (role) => {},
  updateRole: (role) => {},
  deleteRole: (id) => {}
})

export const useRoleContext = (): RoleContextType =>
  useContext(RoleContext)

export default RoleContext
