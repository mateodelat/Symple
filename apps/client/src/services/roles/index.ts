import {
  type CreateRoleDTO,
  type Role,
  type ErrorObject,
  type EditRoleDTO
} from '@/types'
import { customFetch } from '@lib/fetch'

const baseUrl = `${process.env.SERVER_URL ?? ''}/roles`

const create = async (payload: CreateRoleDTO): Promise<Role> => {
  const response = await customFetch({
    baseUrl,
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}

const update = async (
  payload: EditRoleDTO,
  id: string
): Promise<Role> => {
  const newPayload = { ...payload }
  const response = await customFetch({
    baseUrl: `${baseUrl}/${id}`,
    method: 'PATCH',
    body: JSON.stringify(newPayload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}

const getAll = async (departmentId: string): Promise<Role[]> => {
  const response = await customFetch({
    baseUrl: `${baseUrl}/${departmentId}`,
    method: 'GET'
  })
  return response
}

const deleteRole = async (
  id: string,
  enterprise: string
): Promise<ErrorObject> => {
  const response = await customFetch({
    baseUrl: `${baseUrl}/${id}`,
    method: 'DELETE',
    body: JSON.stringify({ enterprise }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}

const rolesService = {
  create,
  update,
  getAll,
  deleteRole
}

export default rolesService
