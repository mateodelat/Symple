'use client'

import { AddIndicatorForm, Button } from '@components/index'
import { type AddIndicatorProps } from '@/types'
import styles from './AddIndicator.module.scss'
import { useEffect } from 'react'

export default function AddIndicator ({
  addedIndicators,
  formMethods,
  addIndicator,
  updateIndicator,
  deleteIndicator
}: AddIndicatorProps): JSX.Element {
  const everyFieldsAreFilled = addedIndicators.every((indicator) => indicator.name !== '' && indicator.amount > 0)

  useEffect(() => {
    addIndicator()
  }, [])

  return (
    <section className={styles.container}>
      {addedIndicators.map((indicator, index) => (
        <AddIndicatorForm
          formMethods={formMethods}
          updateIndicator={updateIndicator}
          deleteIndicator={deleteIndicator}
          canBeDeleted={addedIndicators.length > 1}
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
      >
        Nuevo indicador
      </Button>
    </section>
  )
}
