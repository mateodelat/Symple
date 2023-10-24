'use client'

import { ButtonIcon, SelectField } from '@components/index'
import { IndicatorType, type AddIndicatorProps } from '@/types'
import styles from './AddIndicator.module.scss'
import { roleIndicatorOptions, roleMeasurementOptions } from '@/constants/RoleForm'
import { useEffect, useState } from 'react'

export default function AddIndicator ({ addedIndicators, formMethods }: AddIndicatorProps): JSX.Element {
  const [isRegisterable, setIsRegisterable] = useState<boolean>(false)

  const indicatorSelect = formMethods?.watch('indicatorSelect')
  const measurementSelect = formMethods?.watch('measurementSelect')

  useEffect(() => {
    if (formMethods?.register !== null) setIsRegisterable(true)
    else setIsRegisterable(false)
  }, [formMethods])

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
    formMethods?.setValue('indicatorSelect', roleIndicatorOptions.at(0)?.id ?? '')
  }, [isRegisterable])

  const handleErrors = (name: string): string | undefined => {
    return formMethods?.formState.errors[name]?.message as string ?? undefined
  }

  const indicatorErrorName = handleErrors('indicatorName')
  const indicatorErrorMeasurementValue = handleErrors('measurementValue')
  return (
    <section className={styles.container}>
      <div className={styles.container_indicator}>
        <ButtonIcon
          icon={'/grip_horizontal.svg'}
          width={20}
          height={20}
          className={styles.container_indicator_icon_draggable}
        />
        {isRegisterable &&
          <input type="text" placeholder='Indicador' {...formMethods?.register('indicatorName')}/>
        }
        <ButtonIcon
          icon={'/trash_bin.svg'}
          width={20}
          height={20}
          props={{
            disabled: addedIndicators.length === 0
          }}
        />
      </div>
      {indicatorErrorName !== undefined && (
          <span className={styles.container_error}>
            {indicatorErrorName}
          </span>
      )}
      {isRegisterable &&
        <div className={styles.container_wrapper}>
          <label htmlFor="indicatorSelect" className={styles.container_label}>
            <strong className={styles.container_label_text}>Tipo de indicador</strong>
          </label>
          <SelectField options={roleIndicatorOptions} name='indicatorSelect' register={formMethods?.register}/>
        </div>
      }
      {indicatorSelect === IndicatorType.FINANCIAL_OBJECTIVE && (
          <div className={styles.container_wrapper}>
            <label htmlFor="measurementSelect" className={styles.container_label}>
              <strong className={styles.container_label_text}>Tipo de medición</strong>
            </label>
            <div className={styles.container_wrapper_measurement}>
              <SelectField
                options={roleMeasurementOptions}
                name='measurementSelect'
                register={formMethods?.register}
                className={styles.container_wrapper_measurement_select}
              />
              <input type="text" placeholder={measurementSelect} {...formMethods?.register('measurementValue')}/>
              {indicatorErrorMeasurementValue !== undefined && (
                <span className={styles.container_error}>
                  {indicatorErrorMeasurementValue}
                </span>
              )}
            </div>

          </div>
      )}

    </section>
  )
}
