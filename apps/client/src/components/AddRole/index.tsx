'use client'

import { useEffect, useState } from 'react'
import { Form } from '@components/index'
import { type AddRoleProps } from '@/types'
import styles from './AddRole.module.scss'
import { roleSections, roleSchema, roleSteps, roleInitialValues } from '@/constants/RoleForm'
import { type UseFormReturn } from 'react-hook-form'

export default function AddRole ({ isEditing, isOpen }: AddRoleProps): JSX.Element {
  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)

  useEffect(() => {
    if (formMethods != null) formMethods.reset(roleInitialValues)
  }, [formMethods])

  useEffect(() => {
    if (isOpen === false) {
      formMethods?.reset(roleInitialValues)
    }
  }, [isOpen])

  return (
    <section className={styles.modal}>
      <h1>{!isEditing ? 'Nuevo' : 'Editar'} rol</h1>
      <div className={styles.modal_content}>
        <Form
          schema={roleSchema}
          sections={roleSections}
          onSubmit={(data) => {
            console.log(data)
          }}
          isStepper
          setFormMethods={setFormMethods}
          steps={roleSteps}
          className={styles.modal_content_form}
        />
      </div>
    </section>
  )
}
