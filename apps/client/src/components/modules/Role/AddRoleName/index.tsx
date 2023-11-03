'use client'

import { useEffect } from 'react'

import InputField from '@/components/shared/InputField'
import useCheckErrors from '@/hooks/useCheckErrors'
import { type AddRoleNameProps } from '@/types'
import styles from './AddRoleName.module.scss'

export default function AddRoleName ({
  value,
  updateRoleName,
  setIsBlocked
}: AddRoleNameProps): JSX.Element {
  const { errors, handleErrors } = useCheckErrors({ fields: { roleName: '' } })
  const { roleName } = errors

  const handleUpdate = (value: string): void => {
    updateRoleName(value)
  }

  useEffect(() => {
    if (Object.values(errors).every((val) => val === '')) {
      setIsBlocked(false)
    } else setIsBlocked(true)
  }, [errors])

  return (
    <article className={styles.container}>
      <InputField
        params={{
          placeholder: 'Nombre del rol',
          value,
          id: 'roleName',
          onChange: (e) => {
            handleUpdate(e.target.value)
            handleErrors('roleName', e.target.value, false, false)
          }
        }}
        showLabel
        labelClassName={styles.container_label}
        error={roleName}
        showError
      />
    </article>
  )
}
