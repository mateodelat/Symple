'use client'

import { AddIndicatorForm, Button } from '@components/index'
import { type AddIndicatorProps, IndicatorType } from '@/types'
import styles from './AddIndicator.module.scss'

export default function AddIndicator ({
  addedIndicators,
  formMethods,
  addIndicator,
  deleteIndicator,
  updateIndicator,
  addedUsers,
  setAddedUsers
}: AddIndicatorProps): JSX.Element {
  const everyFieldsAreFilled = addedIndicators.every((indicator) => (
    indicator.name !== '' && (indicator.type === IndicatorType.FINANCIAL_OBJECTIVE ? Number(indicator.amount) > 0 : true)
  ))

  return (
    <section className={styles.container}>
      {addedIndicators.map((indicator, index) => (
        <AddIndicatorForm
          addedUsers={addedUsers}
          setAddedUsers={setAddedUsers}
          formMethods={formMethods}
          canBeDeleted={addedIndicators.length > 1}
          indicator={indicator}
          index={index}
          deleteIndicator={deleteIndicator}
          updateIndicator={updateIndicator}
          key={index}
        />
      ))}
      <Button
        onClick={() => {
          addIndicator()
        }}
        props={{
          disabled: !everyFieldsAreFilled
        }}
        className={styles.container_button}
      >
        Nuevo indicador
      </Button>
    </section>
  )
}
