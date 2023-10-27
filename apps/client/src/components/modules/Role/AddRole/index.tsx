'use client'

import { useEffect, useState } from 'react'
import { Button, Stepper } from '@components/shared/'
import AddIndicator from '@components/modules/Role/AddIndicator'
import { type AddRoleProps, type Indicator, IndicatorType, IndicatorMeasurementType, type IndicatorUserState, type Deliverable } from '@/types'
import { DragDropContext } from '@hello-pangea/dnd'
import styles from './AddRole.module.scss'
import { useStepper } from '@/hooks'
import { roleSteps } from '@/constants/RoleForm'
import AddDeliverable from '../AddDeliverable'

export default function AddRole ({ isEditing, isOpen }: AddRoleProps): JSX.Element {
  const { currentStep, isBlocked, nextStep, previousStep, reset, setIsBlocked } = useStepper()
  const [addedIndicators, setAddedIndicators] = useState<Indicator[]>([])
  const [addedUsers, setAddedUsers] = useState<IndicatorUserState[]>([])
  const [addedDeliverables, setAddedDeliverables] = useState<Deliverable[]>([])

  const addIndicator = (): void => {
    setAddedIndicators((prev) =>
      [
        ...prev,
        {
          name: `Indicador ${prev.length + 1}`,
          amount: '1',
          associatedUsers: [],
          type: IndicatorType.FINANCIAL_OBJECTIVE,
          measurementType: IndicatorMeasurementType.PERCENTAGE,
          index: prev.length
        }
      ]
    )
  }

  const updateIndicator = (index: number, indicator: Indicator): void => {
    setAddedIndicators((prev) => {
      const newIndicators = structuredClone(prev)
      newIndicators[index] = indicator
      return newIndicators
    })
  }

  const deleteIndicator = (index: number): void => {
    setAddedIndicators((prev) => {
      const newIndicators = structuredClone(prev)
      newIndicators.splice(index, 1)
      return newIndicators
    })
  }

  const addDeliverable = (): void => {
    setAddedDeliverables((prev) => [
      ...prev,
      {
        name: `Entregable ${prev.length + 1}`,
        index: prev.length
      }
    ])
  }

  const updateDeliverable = (index: number, deliverable: Deliverable): void => {
    setAddedDeliverables((prev) => {
      const newDeliverables = structuredClone(prev)
      newDeliverables[index] = deliverable
      return newDeliverables
    })
  }

  const deleteDeliverable = (index: number): void => {
    setAddedDeliverables((prev) => {
      const newDeliverables = structuredClone(prev)
      newDeliverables.splice(index, 1)
      return newDeliverables
    })
  }

  const handleSubmit = (): void => {
    const payload = {
      indicators: addedIndicators?.map((element, i) => (
        {
          ...element,
          associatedUsers: addedUsers.find(user => user.index === i)?.addedUsers ?? []
        }
      )),
      deliverables: addedDeliverables.map(el => el.name)
    }
    console.log(payload)
  }

  useEffect(() => {
    if (!isEditing && !isOpen) {
      reset()
      setAddedIndicators([])
      setAddedUsers([])
      addIndicator()
    }
  }, [isOpen])

  const reorder = (source: number, destination: number, droppableId: string): void => {
    if (droppableId === 'indicators') {
      setAddedIndicators((prev) => {
        const newIndicators = structuredClone(prev)
        const [removed] = newIndicators.splice(source, 1)
        newIndicators.splice(destination, 0, removed)
        return newIndicators
      })
    } else if (droppableId === 'deliverables') {
      setAddedDeliverables((prev) => {
        const newDeliverables = structuredClone(prev)
        const [removed] = newDeliverables.splice(source, 1)
        newDeliverables.splice(destination, 0, removed)
        return newDeliverables
      })
    }
  }

  return (
    <>
      {isOpen &&
        <DragDropContext onDragEnd={(result) => {
          console.log(result)
          const { source, destination } = result
          if (destination === null) return
          if (source.index === destination.index && source.droppableId === destination.droppableId) return
          reorder(source.index, destination.index, source.droppableId)
        }}>
          <section className={styles.modal}>
            <h1>{!isEditing ? 'Agregar' : 'Editar'} rol</h1>
            <div className={styles.modal_content}>
              <Stepper
                steps={roleSteps}
                currentStep={currentStep}
                nextStep={nextStep}
                previousStep={previousStep}
              />
              {currentStep === 0 && (
                <AddIndicator
                  addedIndicators={addedIndicators}
                  addIndicator={addIndicator}
                  addedUsers={addedUsers}
                  setAddedUsers={setAddedUsers}
                  deleteIndicator={deleteIndicator}
                  updateIndicator={updateIndicator}
                  isStepperBlocked={isBlocked}
                  setIsBlocked={setIsBlocked}
                />
              )}
              {currentStep === 1 && (
                <AddDeliverable
                  addDeliverable={addDeliverable}
                  addedDeliverables={addedDeliverables}
                  updateDeliverable={updateDeliverable}
                  deleteDeliverable={deleteDeliverable}
                />
              )}
              {currentStep < roleSteps.length - 1
                ? (
                  <Button
                      onClick={nextStep}
                    >
                      Siguiente
                    </Button>
                  )
                : (
                    <Button
                      onClick={handleSubmit}
                    >
                      Guardar rol
                    </Button>
                  )}
            </div>
          </section>
        </DragDropContext>
      }
    </>
  )
}
