'use client'

import { useEffect, useRef, useState } from 'react'
import { AddIndicator, Form } from '@components/index'
import { type CustomField, type AddRoleProps, type Indicator } from '@/types'
import styles from './AddRole.module.scss'
import { roleSections, roleSchema, roleSteps, roleInitialValues } from '@/constants/RoleForm'
import { type UseFormReturn } from 'react-hook-form'

export default function AddRole ({ isEditing, isOpen }: AddRoleProps): JSX.Element {
  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)

  const [addedIndicators] = useState<Indicator[]>([])
  const [customFields, setCustomFields] = useState<CustomField>({
    addIndicators: () => (
      <AddIndicator addedIndicators={addedIndicators} formMethods={formMethods}/>
    )
  })

  const formRef = useRef<{ reset: () => void }>()

  useEffect(() => {
    if (formMethods !== null) formMethods.reset(roleInitialValues)
  }, [formMethods])

  useEffect(() => {
    if (!isOpen) {
      formMethods?.reset(roleInitialValues)
      formRef.current?.reset()
    }
  }, [isOpen])

  useEffect(() => {
    setCustomFields({
      addIndicators: () => (
        <AddIndicator
          addedIndicators={addedIndicators}
          formMethods={formMethods}
          // setAddedIndicators={setAddedIndicators}
        />
      )
    })
  }, [addedIndicators, formMethods])

  return (
    <section className={styles.modal}>
      <h1>{!isEditing ? 'Agregar' : 'Editar'} rol</h1>
      <div className={styles.modal_content}>
        <Form
          schema={roleSchema}
          sections={roleSections}
          customFields={customFields}
          onSubmit={(data) => {
            console.log(data)
          }}
          isStepper
          setFormMethods={setFormMethods}
          steps={roleSteps}
          className={styles.modal_content_form}
          ref={formRef}
        />
      </div>
    </section>
  )
}
