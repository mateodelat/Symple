'use client'

import Button from '@components/shared/Button'
import AddIndicatorForm from '@components/modules/Role/AddIndicatorForm'
import { type AddIndicatorProps, IndicatorType } from '@/types'
import styles from './AddIndicator.module.scss'
import { Droppable } from '@hello-pangea/dnd'

export default function AddIndicator ({
  addedIndicators,
  addIndicator,
  deleteIndicator,
  updateIndicator,
  addedUsers,
  setAddedUsers,
  setIsBlocked
}: AddIndicatorProps): JSX.Element {
  const everyFieldsAreFilled = addedIndicators.every(
    (indicator) =>
      indicator.name !== '' &&
      (indicator.type === IndicatorType.FINANCIAL_OBJECTIVE
        ? Number(indicator.amount) > 0
        : true)
  )

  return (
    <section className={styles.container}>
      <Droppable droppableId="indicators">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {addedIndicators.map((indicator, index) => (
              <AddIndicatorForm
                key={index}
                addedUsers={addedUsers}
                setAddedUsers={setAddedUsers}
                canBeDeleted={addedIndicators.length > 1}
                indicator={indicator}
                index={index}
                deleteIndicator={deleteIndicator}
                updateIndicator={updateIndicator}
                setIsBlocked={setIsBlocked}
              />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
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
