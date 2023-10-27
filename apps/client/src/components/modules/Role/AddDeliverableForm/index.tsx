'use client'

import Image from 'next/image'
// import { useEffect, useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'

import { ButtonIcon, InputField } from '@components/shared/'
import useCheckErrors from '@/hooks/useCheckErrors'
import { type AddDeliverableFormProps } from '@/types'
import styles from './AddDeliverablesForm.module.scss'

export default function AddDeliverableForm ({
  canBeDeleted,
  index,
  deliverable,
  updateDeliverable,
  deleteDeliverable
}: AddDeliverableFormProps): JSX.Element {
  const { errors, handleErrors } = useCheckErrors({ fields: { deliverableName: '' } })
  const { deliverableName } = errors

  const handleUpdate = (value: string): void => {
    const deliverableAux = structuredClone(deliverable)
    deliverableAux.name = value
    updateDeliverable(index, deliverableAux)
  }

  return (
    <Draggable draggableId={index.toString()} index={index} >
      {(draggableProvided) => (
      <article
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      className={styles.card}
      >
        <div className={styles.deliverable}>
          <div {...draggableProvided.dragHandleProps} className={styles.deliverable_button}>
            <Image src={'/grip_horizontal.svg'} alt='' width={20} height={20}/>
          </div>
          <InputField
            params={{
              placeholder: 'Indicador',
              value: deliverable.name,
              onChange: (e) => {
                handleUpdate(e.target.value)
                handleErrors('deliverableName', e.target.value, false, false)
              }
            }}
          />
          <ButtonIcon
            icon={'/trash_bin.svg'}
            width={20}
            height={20}
            props={{
              disabled: !canBeDeleted,
              onClick: () => {
                deleteDeliverable(index)
              }
            }}
          />
        </div>
        {deliverableName !== '' && (
          <span className={styles.error}>
            {deliverableName}
          </span>
        )}
      </article>
      )}
    </Draggable>
  )
}
