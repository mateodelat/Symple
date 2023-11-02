"use client";

import { useEffect } from "react";
import {
  Draggable,
  type DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";

import DraggableInput from "@components/shared/DraggableInput";
import useCheckErrors from "@/hooks/useCheckErrors";
import { type AddDeliverableFormProps } from "@/types";
import styles from "./AddDeliverableForm.module.scss";

export default function AddDeliverableForm({
  canBeDeleted,
  index,
  deliverable,
  updateDeliverable,
  deleteDeliverable,
  setIsBlocked,
}: AddDeliverableFormProps): JSX.Element {
  const { errors, handleErrors } = useCheckErrors({
    fields: { deliverableName: "" },
  });
  const { deliverableName } = errors;

  const handleUpdate = (value: string): void => {
    const deliverableAux = structuredClone(deliverable);
    deliverableAux.name = value;
    updateDeliverable(index, deliverableAux);
  };

  useEffect(() => {
    if (Object.values(errors).every((val) => val === "")) {
      setIsBlocked(false);
    } else setIsBlocked(true);
  }, [errors]);

  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(draggableProvided) => (
        <article
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          className={styles.card}
        >
          <DraggableInput
            canBeDeleted={canBeDeleted}
            deleteElement={deleteDeliverable}
            dragHandleProps={
              draggableProvided.dragHandleProps as DraggableProvidedDragHandleProps
            }
            errorName="deliverableName"
            fieldName="name"
            handleErrors={handleErrors}
            handleUpdate={handleUpdate}
            index={index}
            placeholder="Entregable"
            value={deliverable.name}
          />
          {deliverableName !== "" && (
            <span className={styles.error}>{deliverableName}</span>
          )}
        </article>
      )}
    </Draggable>
  );
}
