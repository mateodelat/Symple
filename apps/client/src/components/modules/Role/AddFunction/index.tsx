'use client'

import Button from '@components/shared/Button'
import AddFunctionForm from '@components/modules/Role/AddFunctionForm'
import { type AddFunctionProps } from '@/types'
import styles from './AddDeliverable.module.scss'
import { Droppable } from '@hello-pangea/dnd'

export default function AddDeliverable ({
  addFunction,
  addedFunctions,
  deleteFunction,
  updateFunction
}: AddFunctionProps
): JSX.Element {
  const everyFieldsAreFilled = addedFunctions.every((f) => (
    f.name !== ''
  ))

  return (
    <section className={styles.container}>
      <Droppable droppableId='deliverables'>
        {(droppableProvided) => (
          <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
            {addedFunctions.map((deliverable, index) => (
              <AddFunctionForm
                key={index}
                index={index}
                deliverable={deliverable}
                updateDeliverable={updateDeliverable}
                canBeDeleted={addedDeliverables.length > 1}
                deleteDeliverable={deleteFunction}
              />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
      <Button
        onClick={() => {
          addFunction()
        }}
        props={{
          disabled: !everyFieldsAreFilled
        }}
        className={styles.container_button}
      >
        Nueva Función
      </Button>
    </section>
  )
}
