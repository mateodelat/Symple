'use client'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { CardDraggable, Modal } from '@components/shared/'
import AddDepartment from '@components/modules/Department/AddDepartment'
import { useToggle } from '@hooks/index'
import {
  type DepartmentStateWithId,
  type CardDepartmentEditProps
} from '@/types'
import styles from './CardDepartmentEdit.module.scss'

export default function CardDepartmentEdit ({
  element,
  deleteDepartment,
  updateDepartment
}: CardDepartmentEditProps): JSX.Element {
  const { toggle, value } = useToggle()
  const [department, setDepartment] = useState<DepartmentStateWithId>({
    name: element.name,
    enterprise: element.enterprise,
    subDepartments:
      element.subDepartments?.length > 0
        ? element.subDepartments?.map((subDepartment) => ({
          id: uuidv4(),
          name: subDepartment.name,
          subDepartments:
              subDepartment.subDepartments?.length > 0
                ? subDepartment.subDepartments?.map((last) => ({
                  id: uuidv4(),
                  name: last.name,
                  subDepartments: []
                }))
                : []
        }))
        : [],
    createdAt: element.createdAt,
    id: element.id
  })

  useEffect(() => {
    const transformDepartment = setTimeout(() => {
      const transformedDepartment = {
        createdAt: department.createdAt as Date,
        enterprise: department.enterprise as string,
        id: department.id as string,
        name: department.name,
        subDepartments: department.subDepartments?.map((sub) => ({
          name: sub.name,
          subDepartments: sub.subDepartments?.map((last) => ({
            name: last.name,
            subDepartments: []
          }))
        }))
      }
      updateDepartment(transformedDepartment)
    }, 150)
    return () => {
      clearTimeout(transformDepartment)
    }
  }, [department])

  return (
    <CardDraggable>
      <div className={styles.department}>
        <AddDepartment
          department={department}
          handleDepartmentChange={setDepartment as any}
          isEditMode
        />
      </div>
      <Modal
        isOpen={value}
        toggle={toggle}
        onConfirm={() => {
          deleteDepartment(element.id)
        }}
      >
        <h3>Atención</h3>
        <p>
          ¿Estás seguro que deseas eliminar este departamento? Se eliminaran
          todos los subdepartamentos dependientes.
        </p>
      </Modal>
    </CardDraggable>
  )
}
