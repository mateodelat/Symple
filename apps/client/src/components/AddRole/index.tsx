'use client'

import { useEffect, useRef, useState } from 'react'
import { AddIndicator, Form } from '@components/index'
import { type CustomField, type AddRoleProps, type Indicator, IndicatorType, IndicatorMeasurementType, type User } from '@/types'
import styles from './AddRole.module.scss'
import { roleSections, roleSchema, roleSteps, roleInitialValues } from '@/constants/RoleForm'
import { type UseFormReturn } from 'react-hook-form'

export default function AddRole ({ isEditing, isOpen }: AddRoleProps): JSX.Element {
  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)

  const [addedIndicators, setAddedIndicators] = useState<Indicator[]>([])
  const [addedUsers, setAddedUsers] = useState<User[]>([])

  const addIndicator = (): void => {
    setAddedIndicators((prev) =>
      [
        ...prev,
        {
          name: `Indicador ${prev.length + 1}`,
          amount: '1',
          associatedUsers: [],
          type: IndicatorType.FINANCIAL_OBJECTIVE,
          measurementType: IndicatorMeasurementType.PERCENTAGE
        }
      ]
    )
  }

  const updateIndicator = (index: number, indicator: Indicator): void => {
    setAddedIndicators((prev) => {
      const newIndicators = structuredClone(prev)
      newIndicators[index] = indicator
      return newIndicators
    })
  }

  const deleteIndicator = (index: number): void => {
    setAddedIndicators((prev) => {
      const newIndicators = structuredClone(prev)
      newIndicators.splice(index, 1)
      return newIndicators
    })
  }

  const [customFields, setCustomFields] = useState<CustomField>({
    addIndicators: () => (
      <AddIndicator
        addedIndicators={addedIndicators}
        addedUsers={addedUsers}
        setAddedUsers={setAddedUsers}
        formMethods={formMethods}
        addIndicator={addIndicator}
        updateIndicator={updateIndicator}
        deleteIndicator={deleteIndicator}
        />
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
      setAddedIndicators([])
      addIndicator()
    }
  }, [isOpen])

  useEffect(() => {
    setCustomFields({
      addIndicators: () => (
        <AddIndicator
          addedIndicators={addedIndicators}
          addedUsers={addedUsers}
          setAddedUsers={setAddedUsers}
          addIndicator={addIndicator}
          updateIndicator={updateIndicator}
          deleteIndicator={deleteIndicator}
          formMethods={formMethods}
        />
      )
    })
  }, [addedIndicators, addedUsers, formMethods])

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
