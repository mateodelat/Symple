'use client'

import { useEffect, useRef, useState } from 'react'
import { AddIndicator, Form } from '@components/index'
import { type CustomField, type AddRoleProps, type Indicator, IndicatorType, IndicatorMeasurementType } from '@/types'
import styles from './AddRole.module.scss'
import { roleSections, roleSchema, roleSteps, roleInitialValues } from '@/constants/RoleForm'
import { type UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'

export default function AddRole ({ isEditing, isOpen }: AddRoleProps): JSX.Element {
  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null)

  const [addedIndicators, setAddedIndicators] = useState<Indicator[]>([])
  const [fields, setFields] = useState<any>(roleSections)
  const [schema, setSchema] = useState<any>(roleSchema)

  const addNewRule = (schema: any, newField: string, newRule: any): yup.ObjectSchema<any, yup.AnyObject, any, ''> => {
    return schema.shape({
      ...schema.fields,
      [newField]: newRule
    })
  }

  const addIndicator = (index?: number): void => {
    setAddedIndicators((prev) =>
      [
        ...prev,
        {
          name: '',
          amount: 0,
          associatedUsers: [],
          type: IndicatorType.FINANCIAL_OBJECTIVE,
          measurementType: IndicatorMeasurementType.PERCENTAGE
        }
      ]
    )

    setSchema((prev: any) => {
      const newSchema = { ...prev }
      newSchema.fields[`indicatorName${addedIndicators.length as any}`] = yup.string().required('Este campo es requerido') as any
      // newSchema = addNewRule(newSchema as any, `indicatorName${addedIndicators.length}`, yup.string().required('Este campo es requerido'))
      // newSchema = addNewRule(newSchema as any, `indicatorSelect${addedIndicators.length}`, yup.string().required('Este campo es requerido'))
      // newSchema = addNewRule(newSchema as any, `measurementSelect${addedIndicators.length}`, yup.string().required('Este campo es requerido'))
      // newSchema = addNewRule(newSchema as any, `measurementValue${addedIndicators.length}`, yup.number().required('Este campo es requerido'))
      return newSchema
    })
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
    }
  }, [isOpen])

  useEffect(() => {
    setCustomFields({
      addIndicators: () => (
        <AddIndicator
          addedIndicators={addedIndicators}
          addIndicator={addIndicator}
          updateIndicator={updateIndicator}
          updateSchema={setSchema}
          deleteIndicator={deleteIndicator}
          formMethods={formMethods}
        />
      )
    })
  }, [addedIndicators, formMethods])

  return (
    <section className={styles.modal}>
      <h1>{!isEditing ? 'Agregar' : 'Editar'} rol</h1>
      <div className={styles.modal_content}>
        <Form
          schema={schema}
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
