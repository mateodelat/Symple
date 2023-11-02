'use client'

import Button from '@components/shared/Button'
import AddFunctionForm from '@components/modules/Role/AddFunctionForm'
import { type AddFunctionProps } from '@/types'
import styles from './AddFunction.module.scss'
import { Droppable } from '@hello-pangea/dnd'

export default function AddFunction ({
  addedFunctions,
  addFunction,
  deleteFunction,
  updateFunction,
  setIsBlocked
}: AddFunctionProps): JSX.Element {
  const everyFieldsAreFilled: boolean = addedFunctions.every(
    (value) => value.name !== ''
  )

  return (
    <section className={styles.container}>
      <Droppable droppableId="functions">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {addedFunctions.map((deliverable, index) => (
              <AddFunctionForm
                key={index}
                index={index}
                functionState={deliverable}
                updateFunction={updateFunction}
                canBeDeleted={addedFunctions.length > 1}
                deleteFunction={deleteFunction}
                setIsBlocked={setIsBlocked}
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
