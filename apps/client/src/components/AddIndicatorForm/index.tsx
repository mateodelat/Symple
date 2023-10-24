'use client'

import { useEffect, useState } from 'react'
import ButtonIcon from '../ButtonIcon'
import { type AddIndicatorFormProps, IndicatorType, IndicatorMeasurementType } from '@/types'
import styles from './AddIndicatorForm.module.scss'
import { roleIndicatorOptions, roleMeasurementOptions } from '@/constants/RoleForm'
import SelectField from '../SelectField'

export default function AddIndicatorForm ({
  formMethods,
  canBeDeleted,
  deleteIndicator,
  updateIndicator
}: AddIndicatorFormProps): JSX.Element {
  const [isRegisterable, setIsRegisterable] = useState<boolean>(false)
  const [displayValue, setDisplayValue] = useState('')

  const handleErrors = (name: string): string | undefined => {
    return formMethods?.formState.errors[name]?.message as string ?? undefined
  }

  const { /* indicatorName, */ indicatorSelect, measurementSelect, measurementValue } = formMethods?.watch()
  const indicatorErrorName = handleErrors('indicatorName')
  const indicatorErrorMeasurementValue = handleErrors('measurementValue')

  useEffect(() => {
    if (formMethods?.register !== null) setIsRegisterable(true)
    else setIsRegisterable(false)
  }, [formMethods])

  useEffect(() => {
    formMethods?.setValue('indicatorSelect', roleIndicatorOptions.at(0)?.id ?? '')
  }, [isRegisterable])

  useEffect(() => {
    if (indicatorSelect === '-' || indicatorSelect === '') {
      if (formMethods?.formState.errors.indicatorSelect === undefined) {
        formMethods?.setError('indicatorSelect', {
          message: 'Este campo es requerido',
          type: 'required'
        })
      }
    }
  }, [indicatorSelect])

  useEffect(() => {
    if (measurementValue === '') setDisplayValue('')
    if (measurementSelect === IndicatorMeasurementType.PERCENTAGE && measurementValue !== undefined && measurementValue !== '') {
      setDisplayValue(`${Number(measurementValue).toFixed(2) ?? 0}%`)
    } else if (measurementSelect === IndicatorMeasurementType.AMOUNT) {
      setDisplayValue(new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(measurementValue))
    }
  }, [measurementValue, measurementSelect])

  return (
    <div className={styles.card}>
      <div className={styles.indicator}>
        <ButtonIcon
          icon={'/grip_horizontal.svg'}
          width={20}
          height={20}
          className={styles.indicator_icon_draggable}
        />
        {isRegisterable &&
          <input type="text" placeholder='Indicador' {...formMethods?.register('indicatorName')}/>
        }
        <ButtonIcon
          icon={'/trash_bin.svg'}
          width={20}
          height={20}
          props={{
            disabled: !canBeDeleted
          }}
        />
      </div>
      {indicatorErrorName !== undefined && (
        <span className={styles.error}>
          {indicatorErrorName}
        </span>
      )}
      {isRegisterable &&
        <div className={styles.wrapper}>
          <label htmlFor="indicatorSelect" className={styles.label}>
            <strong className={styles.label_text}>Tipo de indicador</strong>
          </label>
          <SelectField options={roleIndicatorOptions} name='indicatorSelect' register={formMethods?.register}/>
        </div>
      }
      {indicatorSelect === IndicatorType.FINANCIAL_OBJECTIVE && (
        <div className={styles.wrapper}>
          <label htmlFor="measurementSelect" className={styles.label}>
            <strong className={styles.label_text}>Tipo de medición</strong>
          </label>
          <div className={styles.wrapper_measurement}>
            <SelectField
              options={roleMeasurementOptions}
              name='measurementSelect'
              register={formMethods?.register}
              className={styles.wrapper_measurement_select}
            />
            <input type="text" placeholder={measurementSelect} {...formMethods?.register('measurementValue')}/>
            {indicatorErrorMeasurementValue !== undefined && (
              <span className={`${styles.error} ${styles.error_grid}`}>
                {indicatorErrorMeasurementValue}
              </span>
            )}
            <span>{displayValue}</span>
          </div>
        </div>
      )}
    </div>
  )
}
