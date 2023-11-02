'use client'

import Image from 'next/image'

import { Button, Modal } from '@components/shared/'
import { AddUsers, CardUser } from '@components/modules/User/'
import { useToggle } from '@hooks/index'

import styles from './AddUsersWrapper.module.scss'
import { type AddUsersWrapperProps } from '@/types'
import { type User } from 'next-auth'
import toast from 'react-hot-toast'

export default function AddUsersWrapper ({
  addedUsers,
  setAddedUsers,
  modalClassName = ''
}: AddUsersWrapperProps): JSX.Element {
  const { value, toggle } = useToggle()

  const handleAddUser = (user: User): void => {
    setAddedUsers((prev) => {
      return [...prev, user] as any
    })
  }

  const handleRemoveUser = (user: User): void => {
    setAddedUsers((prev) =>
      prev.filter((addedUser) => addedUser.id !== user.id)
    )
  }

  const confirmModal = (): void => {
    toast.success('Usuarios añadidos correctamente.')
    toggle()
  }

  const cancelModal = (): void => {
    setAddedUsers([])
  }

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={toggle}
        className={styles.button}
        props={{ name: 'addUsers' }}
      >
        <span>Añadir usuario</span>
        <Image
          src={'/add_button.svg'}
          width={20}
          height={20}
          alt="Botón para añadir usuarios a empresa"
        />
      </Button>
      {!value && addedUsers.length > 0 && (
        <div className={styles.addedUsers}>
          <h4>Usuarios añadidos</h4>
          {addedUsers.map((user) => (
            <CardUser key={user.id} element={user} />
          ))}
        </div>
      )}
      <Modal
        isOpen={value}
        toggle={toggle}
        onConfirm={confirmModal}
        onCancel={cancelModal}
        className={modalClassName}
      >
        <AddUsers
          addedUsers={addedUsers}
          addUser={handleAddUser}
          removeUser={handleRemoveUser}
        />
      </Modal>
    </div>
  )
}
