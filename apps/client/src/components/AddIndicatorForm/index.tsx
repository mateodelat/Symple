'use client'

import { useEffect, useState } from 'react'

import ButtonIcon from '../ButtonIcon'
import styles from './AddIndicatorForm.module.scss'
import { roleIndicatorOptions, roleMeasurementOptions } from '@/constants/RoleForm'
import { type AddIndicatorFormProps, IndicatorType, IndicatorMeasurementType, type AddIndicatorFormErrors } from '@/types'
import { AddUsersWrapper, SelectField, InputField } from '@/components/index'
import { Draggable } from '@hello-pangea/dnd'
import Image from 'next/image'

const possibleErrors = {
  required: 'El campo es requerido',
  numeric: 'El campo debe ser numérico',
  percentage: 'El campo no puede tener más de dos decimales',
  min: 'El campo no puede ser menor a 0',
  max: 'El campo no puede ser mayor a 100'
}

const { max, min, numeric, percentage, required } = possibleErrors

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
  const [errors, setErrors] = useState<AddIndicatorFormErrors>({ indicatorName: '', indicatorMeasurementValue: '' })
  const [localAddedUsers, setLocalAddedUsers] = useState(addedUsers.find(user => user.index === index)?.addedUsers ?? [])
  const [width, setWidth] = useState(0)

  const handleUpdate = (value: string, name: string): void => {
    updateIndicator(index, {
      ...indicator,
      [name]: value
    })
  }

  const handleErrors = (name: string, value: string, isNumber: boolean, isPercentage: boolean): void => {
    let error = ''
    if (value === '') error = required
    else if (isNaN(Number(value)) && isNumber) error = numeric
    else if (value !== '' && !(/^-?\d+(\.\d{0,2})?$/.test(value)) && isNumber && isPercentage) error = percentage
    else if (Number(value) <= 0 && isPercentage) error = min
    else if (Number(value) > 100 && isPercentage) error = max

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }))
  }

  const formatValue = (type: IndicatorMeasurementType, value: string): string => {
    if (type === IndicatorMeasurementType.PERCENTAGE) return `${value}%`
    return `$${value.match(/.{1,3}/g)?.join("'") ?? ''}`
  }

  const { indicatorName, indicatorMeasurementValue } = errors

  const format = formatValue(indicator.measurementType ?? IndicatorMeasurementType.PERCENTAGE, indicator.amount.toString())

  useEffect(() => {
    const input = document.querySelector('#indicatorMeasurementValue') as HTMLInputElement
    if (input !== null) setWidth(input.offsetWidth)
  }, [])

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
        <div className={styles.indicator}>
          <div {...draggableProvided.dragHandleProps} className={styles.indicator_button}>
            <Image src={'/grip_horizontal.svg'} alt='' width={20} height={20}/>
          </div>
          <InputField
            params={{
              placeholder: 'Indicador',
              value: indicator.name,
              onChange: (e) => {
                handleUpdate(e.target.value, 'name')
                handleErrors('indicatorName', e.target.value, false, false)
              }
            }}
          />
          <ButtonIcon
            icon={'/trash_bin.svg'}
            width={20}
            height={20}
            props={{
              disabled: !canBeDeleted,
              onClick: () => {
                deleteIndicator(index)
              }
            }}
          />
        </div>
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
                <span title={format} className={styles.format} style={{ width }}>{format}</span>
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
