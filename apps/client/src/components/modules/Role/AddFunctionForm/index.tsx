'use client'

import { Draggable, type DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'

import DraggableInput from '@/components/shared/DraggableInput'
import useCheckErrors from '@/hooks/useCheckErrors'
import { type AddFunctionFormProps } from '@/types'
import styles from './AddFunctionForm.module.scss'
import { useEffect } from 'react'

export default function AddFunctionForm ({
  canBeDeleted,
  index,
  deleteFunction,
  functionState,
  updateFunction,
  setIsBlocked
}: AddFunctionFormProps): JSX.Element {
  const { errors, handleErrors } = useCheckErrors({ fields: { functionName: '' } })
  const { functionName } = errors

  const handleUpdate = (value: string): void => {
    const functionAux = structuredClone(functionState)
    functionAux.name = value
    updateFunction(index, functionAux)
  }

  useEffect(() => {
    if (Object.values(errors).every((val) => val === '')) { setIsBlocked(false) } else setIsBlocked(true)
  }, [errors])

  return (
    <Draggable draggableId={index.toString()} index={index} >
      {(draggableProvided) => (
      <article
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      className={styles.card}
      >
        <DraggableInput
          canBeDeleted={canBeDeleted}
          deleteElement={deleteFunction}
          dragHandleProps={draggableProvided.dragHandleProps as DraggableProvidedDragHandleProps}
          errorName='functionName'
          fieldName='name'
          handleErrors={handleErrors}
          handleUpdate={handleUpdate}
          index={index}
          placeholder='Función'
          value={functionState.name}
        />
        {functionName !== '' && (
          <span className={styles.error}>
            {functionName}
          </span>
        )}
      </article>
      )}
    </Draggable>
  )
}
