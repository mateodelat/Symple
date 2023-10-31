'use client'

import { useEffect, useState } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'

import { Button, Stepper } from '@components/shared/'
import { AddIndicator, AddDeliverable, AddFunction } from '@components/modules/Role/'
import { useStepper } from '@/hooks'
import { roleSteps } from '@/constants/RoleForm'
import { type AddRoleProps, type Indicator, IndicatorType, IndicatorMeasurementType, type IndicatorUserState, type Deliverable, type FunctionState } from '@/types'
import styles from './AddRole.module.scss'
import rolesService from '@/services/roles'
import toast from 'react-hot-toast'
import { useRoleContext } from '@/contexts'

export default function AddRole ({ isEditing, isOpen, department, toggle }: AddRoleProps): JSX.Element {
  const { currentStep, nextStep, previousStep, reset, setIsBlocked } = useStepper()

  const [addedIndicators, setAddedIndicators] = useState<Indicator[]>([])
  const [addedUsers, setAddedUsers] = useState<IndicatorUserState[]>([])
  const [addedDeliverables, setAddedDeliverables] = useState<Deliverable[]>([])
  const [addedFunctions, setAddedFunctions] = useState<FunctionState[]>([])

  const { addRole } = useRoleContext()

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

  const addFunction = (): void => {
    setAddedFunctions((prev) => [
      ...prev,
      {
        name: `Función ${prev.length + 1}`,
        index: prev.length
      }
    ])
  }

  const updateFunction = (index: number, functionState: FunctionState): void => {
    setAddedFunctions((prev) => {
      const newFunctions = structuredClone(prev)
      newFunctions[index] = functionState
      return newFunctions
    })
  }

  const deleteFunction = (index: number): void => {
    setAddedFunctions((prev) => {
      const newFunctions = structuredClone(prev)
      newFunctions.splice(index, 1)
      return newFunctions
    })
  }

  const handleSubmit = async (): Promise<void> => {
    const payload = {
      indicators: addedIndicators?.map((element, i) => (
        {
          ...element,
          associatedUsers: addedUsers.find(user => user.index === i)?.addedUsers ?? []
        }
      )),
      deliverables: addedDeliverables,
      functions: addedFunctions,
      department
    }

    if (!isEditing) {
      await toast.promise(
        rolesService.create(payload),
        {
          loading: 'Creando rol...',
          error: (err: any) => {
            toggle()
            return `Ocurrió un error al crear el rol: ${err.message as string}`
          },
          success: (response) => {
            toggle()
            addRole(response)
            return 'Rol creado correctamente.'
          }
        }
      )
    } else {
      /* await toast.promise(
        rolesService.update(
          enterpriseToEdit.id,
          data as EditEnterpriseDTO
        ),
        {
          loading: 'Actualizando empresa...',
          error: (err: any) =>
            `Ocurrió un error al actualizar la empresa: ${
              err.message as string
            }`,
          success: (response) => {
            response.admins = admins
            if (enterpriseToEdit.id !== undefined) { updateEnterprise(enterpriseToEdit.id, response) }
            return `Empresa ${response.name} actualizada correctamente.`
          }
        }
      )
      setTimeout(() => {
        back()
      }, 300) */
    }
  }

  useEffect(() => {
    if (!isEditing && !isOpen) {
      reset()
      setAddedIndicators([])
      setAddedUsers([])
      setAddedDeliverables([])
      setAddedFunctions([])
      addIndicator()
      addDeliverable()
      addFunction()
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
    } else if (droppableId === 'functions') {
      setAddedFunctions((prev) => {
        const newFunctions = structuredClone(prev)
        const [removed] = newFunctions.splice(source, 1)
        newFunctions.splice(destination, 0, removed)
        return newFunctions
      })
    }
  }

  return (
    <>
      {isOpen &&
        <DragDropContext onDragEnd={(result) => {
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
                  setIsBlocked={setIsBlocked}
                />
              )}
              {currentStep === 1 && (
                <AddDeliverable
                  addDeliverable={addDeliverable}
                  addedDeliverables={addedDeliverables}
                  updateDeliverable={updateDeliverable}
                  deleteDeliverable={deleteDeliverable}
                  setIsBlocked={setIsBlocked}
                />
              )}
              {currentStep === 2 && (
                <AddFunction
                  addFunction={addFunction}
                  addedFunctions={addedFunctions}
                  updateFunction={updateFunction}
                  deleteFunction={deleteFunction}
                  setIsBlocked={setIsBlocked}
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
