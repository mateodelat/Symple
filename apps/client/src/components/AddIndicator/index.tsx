'use client'

import { AddIndicatorForm, Button } from '@components/index'
import { type AddIndicatorProps } from '@/types'
import styles from './AddIndicator.module.scss'

export default function AddIndicator ({ addedIndicators, formMethods }: AddIndicatorProps): JSX.Element {
  // useEffect(() => {
  //   if (measurementSelect === IndicatorMeasurementType.PERCENTAGE) {
  //     if (measurementValue !== null && typeof measurementValue === 'number') {
  //       setDisplayValue(`${measurementValue !== undefined ? measurementValue.toFixed(2) : 0}%`)
  //     }
  //   } else if (measurementSelect === IndicatorMeasurementType.AMOUNT) {
  //     setDisplayValue(new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD'
  //     }).format(measurementValue))
  //   }
  // }, [measurementValue, measurementSelect])

  const everyFieldsAreFilled = addedIndicators.every((indicator) => {
    return indicator.name !== '' && indicator.amount !== null && indicator.amount > 0
  })

  return (
    <section className={styles.container}>
      <AddIndicatorForm
        formMethods={formMethods}
        addedIndicators={addedIndicators}
      />
      {<Button props={{
        disabled: !everyFieldsAreFilled
      }}>Agregar indicador</Button>}
    </section>
  )
}
