'use client'

import Button from '@components/shared/Button'
import AddDeliverableForm from '@components/modules/Role/AddDeliverableForm'
import { type AddDeliverableProps } from '@/types'
import styles from './AddDeliverable.module.scss'
import { Droppable } from '@hello-pangea/dnd'

export default function AddDeliverable ({
  addedDeliverables,
  addDeliverable,
  updateDeliverable,
  deleteDeliverable,
  setIsBlocked
}: AddDeliverableProps): JSX.Element {
  const everyFieldsAreFilled: boolean = addedDeliverables.every(
    (deliverable) => deliverable.name !== ''
  )

  return (
    <section className={styles.container}>
      <Droppable droppableId="deliverables">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {addedDeliverables.map((deliverable, index) => (
              <AddDeliverableForm
                key={index}
                index={index}
                deliverable={deliverable}
                updateDeliverable={updateDeliverable}
                canBeDeleted={addedDeliverables.length > 1}
                deleteDeliverable={deleteDeliverable}
                setIsBlocked={setIsBlocked}
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
        Nuevo Entregable
      </Button>
    </section>
  )
}
