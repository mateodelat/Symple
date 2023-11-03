'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import Form from '@components/shared/Form'
import { userService } from '@/services'
import { useUserContext } from '@/contexts'
import { sections, schema } from '@constants/UserForm'
import { type CreateUserDTO, type UserFormData } from '@/types'
import styles from './UserForm.module.scss'

export default function UserForm (): JSX.Element {
  const { addUser } = useUserContext()
  const { back } = useRouter()
  const onSubmit = async (data: UserFormData): Promise<void> => {
    try {
      const { repeatPassword, ...restOfData } = data
      const payload: CreateUserDTO = { ...restOfData, role: 'user' }
      const response = await userService.create(payload)
      addUser(response)
      toast.success(
        `Usuario ${response.name} ${response.lastName} creado con éxito`
      )

      setTimeout(() => {
        back()
      }, 1000)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <Form
      sections={sections}
      schema={schema}
      onSubmit={onSubmit}
      className={styles.form}
    />
  )
}
