'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import SearchBar from '@components/shared/SearchBar'
import CardUserEdit from '@components/modules/User/CardUserEdit'
import { useUserContext } from '@contexts/User/context'
import styles from './AddUsers.module.scss'
import { type AddUsersProps, type User } from '@/types'

const listEmptyMessages = {
  notFound: 'No existen usuarios con el filtro ingresado.',
  noUsers: 'No hay usuarios restantes.',
  noData: 'No existen usuarios registrados.',
  startState: 'Busca por correo, nombre o apellido a usuarios.'
}

export default function AddUsers ({
  addedUsers,
  addUser,
  removeUser
}: AddUsersProps): JSX.Element {
  const { users: data } = useUserContext()
  const [users, setUsers] = useState<User[]>([])
  const [filter, setFilter] = useState<string>('')
  const [isFiltering, setIsFiltering] = useState<boolean>(false)
  const [message, setMessage] = useState(listEmptyMessages.startState)

  const handleAddUsers = (user: User): void => {
    addUser(user)
    setUsers(() => users.filter((u) => u.id !== user.id))
  }

  const handleRemoveUsers = (user: User): void => {
    removeUser(user)
    if (handleFilter(user, filter)) setUsers((prev) => [...prev, user])
  }

  const handleFilter = (user: User, filter: string): boolean => {
    const { email, id, lastName, name } = user

    const aux = filter.toLowerCase()
    const emailLoweredCase = email.toLowerCase()
    const nameLoweredCase = name.toLowerCase()
    const lastNameLoweredCase = lastName.toLowerCase()

    return (
      (emailLoweredCase.startsWith(aux) ||
        emailLoweredCase.endsWith(aux) ||
        nameLoweredCase.startsWith(aux) ||
        nameLoweredCase.endsWith(aux) ||
        lastNameLoweredCase.startsWith(aux) ||
        lastNameLoweredCase.endsWith(aux)) &&
      !addedUsers.some((addedUser) => addedUser.id === id)
    )
  }

  const handleUsersFilter = (filter: string): void => {
    if (filter === '') {
      setIsFiltering(false)
      setUsers([])
      return
    }
    setIsFiltering(true)
    setUsers(() => data.filter((user) => handleFilter(user, filter)))
  }

  useEffect(() => {
    let finalMessage = ''
    if (data.length === 0) finalMessage = listEmptyMessages.noData
    if (isFiltering && users.length === 0) {
      finalMessage = listEmptyMessages.notFound
    }
    if (addedUsers.length > 0 && isFiltering && users.length === 0) {
      finalMessage = listEmptyMessages.noUsers
    }
    if (!isFiltering && users.length === 0) {
      finalMessage = listEmptyMessages.startState
    }

    setMessage(finalMessage)
  }, [filter, users, addedUsers, data])

  return (
    <article className={styles.addUsers}>
      <h2>Agregar miembros</h2>
      <div className={styles.addUsers_addedList}>
        {addedUsers.length === 0 && <h2>No se han asignado usuarios.</h2>}
        {addedUsers.map((user) => (
          <CardUserEdit
            element={user}
            key={user.id}
            onClick={() => {
              handleRemoveUsers(user)
            }}
          />
        ))}
      </div>
      <SearchBar
        title="Nombre / Correo del usuario registrado"
        handleData={handleUsersFilter}
        filter={filter}
        setFilter={setFilter}
      />
      <h3>{message}</h3>
      <Link
        href={'/admin-panel/user/new'}
        className={styles.addUsers_newMember}
      >
        Registrar miembro
      </Link>

      {users.length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            <CardUserEdit
              element={user}
              onClick={() => {
                handleAddUsers(user)
              }}
              isAdding
            />
          </div>
        ))}
    </article>
  )
}
