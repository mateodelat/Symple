'use server'

import { type User } from '@/types'
import List from '@components/shared/List'
import CardUserEdit from '@components/modules/User/CardUserEdit'
import userService from '@services/users'

export default async function UsersPage (): Promise<JSX.Element> {
  let users: User[] = []
  try {
    users = await userService.getAll()
  } catch {}

  return (
    <div>
      <List
        list={users}
        newElement="Nuevo usuario"
        newElementPage={'/admin-panel/users/new'}
        listEmptyMessage="No existen usuarios registrados..."
        canCreateElement
        Card={CardUserEdit}
      />
    </div>
  )
}
