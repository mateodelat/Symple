'use client'

import { useEffect, useState } from 'react'
import { Draggable, type DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'

import { SelectField, InputField, DraggableInput } from '@/components/shared/'
import AddUsersWrapper from '@components/modules/User/AddUsersWrapper'
import useCheckErrors from '@/hooks/useCheckErrors'
import { roleIndicatorOptions, roleMeasurementOptions } from '@/constants/RoleForm'
import { type AddIndicatorFormProps, IndicatorType, IndicatorMeasurementType } from '@/types'
import styles from './AddIndicatorForm.module.scss'

export default function AddIndicatorForm ({
  canBeDeleted,
  deleteIndicator,
  updateIndicator,
  indicator,
  index,
  addedUsers,
  setAddedUsers,
  setIsBlocked
}: AddIndicatorFormProps): JSX.Element {
  const { errors, handleErrors } = useCheckErrors({ fields: { indicatorName: '', indicatorMeasurementValue: '' } })
  const [localAddedUsers, setLocalAddedUsers] = useState(addedUsers.find(user => user.index === index)?.addedUsers ?? [])

  const handleUpdate = (value: string, name: string): void => {
    updateIndicator(index, {
      ...indicator,
      [name]: value
    })
  }

  const formatValue = (type: IndicatorMeasurementType, value: string): string => {
    if (type === IndicatorMeasurementType.PERCENTAGE) return `${value}%`
    return `$${value.match(/.{1,3}/g)?.join("'") ?? ''}`
  }

  const { indicatorName, indicatorMeasurementValue } = errors

  const format = formatValue(indicator.measurementType ?? IndicatorMeasurementType.PERCENTAGE, indicator.amount.toString())

  useEffect(() => {
    handleUpdate('1', 'amount')
  }, [indicator.type])

  useEffect(() => {
    handleErrors('indicatorMeasurementValue', indicator.amount.toString(), true, indicator.measurementType === IndicatorMeasurementType.PERCENTAGE)
  }, [indicator.measurementType])

  useEffect(() => {
    if (Object.values(errors).every((val) => val === '')) { setIsBlocked(false) } else setIsBlocked(true)
  }, [errors])

  useEffect(() => {
    setAddedUsers(prev => {
      const newAddedUsers = structuredClone(prev)
      const userIndex = newAddedUsers.findIndex(user => user.index === index)
      if (userIndex !== -1) newAddedUsers[userIndex].addedUsers = localAddedUsers
      else newAddedUsers.push({ index, addedUsers: localAddedUsers })
      return newAddedUsers
    })
  }, [localAddedUsers])

  return (
    <Draggable draggableId={index.toString()} index={index} >
      {(draggableProvided) => (
      <article
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      className={styles.card}
      >
        <DraggableInput
          canBeDeleted={canBeDeleted}
          deleteElement={deleteIndicator}
          dragHandleProps={draggableProvided.dragHandleProps as DraggableProvidedDragHandleProps}
          errorName='indicatorName'
          fieldName='name'
          handleErrors={handleErrors}
          handleUpdate={handleUpdate}
          index={index}
          placeholder='Indicador'
          value={indicator.name}
        />
        {indicatorName !== '' && (
          <span className={styles.error}>
            {indicatorName}
          </span>
        )}
          <div className={styles.wrapper}>
            <label htmlFor="indicatorSelect" className={styles.label}>
              <strong className={styles.label_text}>Tipo de indicador</strong>
            </label>
            <SelectField
              options={roleIndicatorOptions}
              name='indicatorSelect'
              props={{
                value: indicator.type,
                onChange: (e) => {
                  handleUpdate(e.target.value, 'type')
                }
              }}
            />
          </div>
        {indicator.type === IndicatorType.FINANCIAL_OBJECTIVE && (
          <div className={styles.wrapper}>
            <label htmlFor="measurementSelect" className={styles.label}>
              <strong className={styles.label_text}>Tipo de medición</strong>
            </label>
            <div className={styles.wrapper_measurement}>
              <SelectField
                options={roleMeasurementOptions}
                name='measurementSelect'
                className={styles.wrapper_measurement_select}
                props={{
                  value: indicator.measurementType,
                  onChange: (e) => {
                    handleUpdate(e.target.value, 'measurementType')
                  }
                }}
              />
              <InputField
                params={{
                  placeholder: indicator.measurementType,
                  value: indicator.amount,
                  inputMode: 'numeric',
                  id: 'indicatorMeasurementValue',
                  onChange: (e) => {
                    handleUpdate(e.target.value, 'amount')
                    handleErrors('indicatorMeasurementValue', e.target.value, true, indicator.measurementType === IndicatorMeasurementType.PERCENTAGE)
                  }
                }}
                showError
                error={indicatorMeasurementValue}
              />
              {Number(indicator.amount) > 0 && (
                <span title={format} className={styles.format}>{format}</span>
              )}
            </div>
          </div>
        )}
        <AddUsersWrapper
          addedUsers={localAddedUsers}
          setAddedUsers={setLocalAddedUsers}
        />
      </article>
      )}

    </Draggable>

  )
}
