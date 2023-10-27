'use client'

import Button from '@components/shared/Button'
import AddDeliverablesForm from '@components/modules/Role/AddDeliverablesForm'
import { type AddDeliverablesProps } from '@/types'
import styles from './AddIndicator.module.scss'
import { Droppable } from '@hello-pangea/dnd'

export default function AddIndicator ({
  addedDeliverables,
  addDeliverable
}: AddDeliverablesProps): JSX.Element {
  const everyFieldsAreFilled = addedDeliverables.every((deliverable) => (
    deliverable.name !== ''
  ))

  return (
    <section className={styles.container}>
      <Droppable droppableId='deliverables'>
        {(droppableProvided) => (
          <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className={styles.list}>
            {addedDeliverables.map((indicator, index) => (
              <AddDeliverablesForm
                key={index}
                // addedDeliverables={addedDeliverables}
              />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
      <Button
        onClick={() => {
          addDeliverable()
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
