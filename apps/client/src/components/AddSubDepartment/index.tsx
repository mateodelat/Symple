'use client'

import { type AddSubdepartmentProps } from '@/types'
import styles from './AddSubDepartment.module.scss'
import ButtonIcon from '../ButtonIcon'
import { v4 as uuidv4 } from 'uuid'

export default function AddSubDepartment ({
  handleDepartmentChange,
  index,
  department,
  isEditMode = false
}: AddSubdepartmentProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        <input
          type="text"
          placeholder="Sub departamento"
          className={styles.container_input}
          defaultValue={
            isEditMode ? department.subDepartments[index].name : undefined
          }
          onChange={(e) => {
            handleDepartmentChange((prev) => {
              const newDepartment = { ...prev }
              newDepartment.subDepartments[index].name = e.target.value
              return newDepartment
            })
          }}
        />
        <ButtonIcon
          icon={'/trash_bin.svg'}
          className={styles.container_wrapper_button}
          props={{
            onClick: () => {
              handleDepartmentChange((prev) => {
                const newDepartment = { ...prev }
                const aux = newDepartment.subDepartments
                const subDepartments = [
                  ...aux?.slice(0, index),
                  ...aux?.slice(index + 1, aux.length)
                ]
                newDepartment.subDepartments = subDepartments
                return newDepartment
              })
            }
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          handleDepartmentChange((prev) => {
            const newDepartment = { ...prev }

            newDepartment.subDepartments[index].subDepartments?.push({
              name: '',
              subDepartments: [],
              id: uuidv4()
            })
            return newDepartment
          })
        }}
        className={styles.container_button}
      >
        +
      </button>
      {department.subDepartments[index].subDepartments.map((last, i) => (
        <div key={last.id} className={styles.container_subdepartment}>
          <div className={styles.container_wrapper}>
            <input
              type="text"
              placeholder="Sub departamento - "
              value={isEditMode ? last.name : undefined}
              onChange={(e) => {
                handleDepartmentChange((prev: any) => {
                  const newDepartment = { ...prev }
                  newDepartment.subDepartments[index].subDepartments[i].name =
                    e.target.value
                  return newDepartment
                })
              }}
            />
            <ButtonIcon
              icon={'/trash_bin.svg'}
              props={{
                onClick: () => {
                  handleDepartmentChange((prev) => {
                    const newDepartment = { ...prev }
                    const aux =
                    newDepartment.subDepartments[index].subDepartments

                    aux.splice(i, 1)

                    newDepartment.subDepartments[index].subDepartments = aux
                    return newDepartment
                  })
                }
              }}
              className={styles.container_wrapper_button}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
