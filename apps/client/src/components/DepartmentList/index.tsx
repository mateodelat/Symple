'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import {
  Button,
  ButtonIcon,
  CardDepartment,
  CardDepartmentEdit,
  LinkButton,
  Modal
} from '@components/index'
import { useToggle, useWindowResize } from '@/hooks'
import { departmentsService } from '@/services'
import { type DepartmentListProps, type Department } from '@/types'
import styles from './DepartmentList.module.scss'

export default function DepartmentList ({
  departments,
  enterpriseId,
  title,
  deleteDepartment,
  updateDepartment
}: DepartmentListProps): JSX.Element {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const currentPath = usePathname()
  const { toggle, value: isCancelOpen } = useToggle()
  const { windowSize } = useWindowResize()

  const [canCreate, setCanCreate] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [cancelChanges, setCancelChanges] = useState(false)
  const [saveChanges, setSaveChanges] = useState(false)
  const [departmentsState, setDepartmentsState] = useState(departments)

  const handleDepartmentChanges = (department: Department): void => {
    const index = departmentsState.findIndex((e) => e.id === department.id)
    const newDepartments = [...departmentsState]

    newDepartments[index] = department
    setDepartmentsState(newDepartments)
  }

  const handleDepartmentDelete = (id: string): void => {
    setDepartmentsState((prev) => {
      return prev.filter((enterprise) => enterprise.id !== id)
    })
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setCanCreate(
        session?.user.role === 'admin' ||
          session.user.enterprises?.findIndex((e) => e === enterpriseId) !== -1
      )
    }
  }, [status])

  useEffect(() => {
    setDepartmentsState(departments)
  }, [departments])

  useEffect(() => {
    const hasSameValues = Object.entries(departments).every(([key]) => (
      departments[key as any] === departmentsState[key as any]
    ))

    if (hasSameValues) {
      setIsEditing(false)
      setSaveChanges(false)
      setCancelChanges(false)
    } else {
      if (cancelChanges) {
        toggle()
      }
      if (saveChanges) {
        const deleteDepartments = async (): Promise<void> => {
          const deletedDepartments = departments.filter(
            (department) =>
              departmentsState.find((ds) => ds.id === department.id) ===
              undefined
          )
          if (deletedDepartments.length > 0) {
            const toastId = toast.loading('Eliminando departamentos...')
            for (const department of deletedDepartments) {
              try {
                await departmentsService.deleteDepartment(
                  department.id,
                  department.enterprise
                )
                deleteDepartment(department.id)
              } catch (e: any) {
                toast.error(e.message, { id: toastId })
              }
            }
            toast.success('Departamentos eliminados', { id: toastId })
          }
        }

        const updateDepartments = async (): Promise<void> => {
          try {
            const toastId = toast.loading('Actualizando departamentos...')
            for (const department of departmentsState) {
              const { createdAt, id, ...payload } = department
              try {
                const response = await departmentsService.update(
                  payload,
                  department.id
                )
                updateDepartment(response)
              } catch (e: any) {
                toast.error(e.message, { id: toastId })
              }
            }

            toast.success('Departamentos actualizados', { id: toastId })
            setSaveChanges(false)
            setIsEditing(false)
          } catch {}
        }

        void deleteDepartments()
        void updateDepartments()
      }
    }
  }, [cancelChanges, saveChanges])

  const handleCardClick = (id: string): void => {
    push(`${currentPath}/department/${id}`)
  }

  return (
    <div className={styles.container}>
      {canCreate && !isEditing && (
        <LinkButton
          href={`/admin-panel/enterprise/${enterpriseId}/create-department`}
          className={styles.container_new}
        >
          Crear departamento
        </LinkButton>
      )}
      {departments.length === 0
        ? (
        <h3>No existen departamentos en esta empresa...</h3>
          )
        : canCreate && windowSize < 1024
          ? (
        <>
          <Button
            onClick={() => {
              if (!isEditing) setIsEditing((prev) => !prev)
              else setSaveChanges(true)
            }}
            className={styles.container_button}
          >
            {isEditing ? 'Guardar' : 'Editar'} estructura
          </Button>
          {isEditing && (
            <>
              <Button
                onClick={() => {
                  setCancelChanges(true)
                }}
                className={styles.container_button}
              >
                Cancelar cambios
              </Button>
            </>
          )}
          <h3 className={styles.container_title}>{title}</h3>
        </>
            )
          : (
        <>
          <div className={styles.desktop_wrapper}>
            <h2 className={styles.desktop_wrapper_title}>{title}</h2>
            {!isEditing
              ? (
              <ButtonIcon
                icon={'/pencil.svg'}
                width={30}
                height={30}
                props={{
                  onClick: () => {
                    if (!isEditing) setIsEditing((prev) => !prev)
                  }
                }}
                className={styles.desktop_wrapper_buttons_btn}
              />
                )
              : (
              <div className={styles.desktop_wrapper_buttons}>
                <ButtonIcon
                  icon={'/x.svg'}
                  width={30}
                  height={30}
                  props={{
                    onClick: () => {
                      setCancelChanges(true)
                    }
                  }}
                  className={styles.desktop_wrapper_buttons_btn}
                />
                <ButtonIcon
                  icon={'/check.svg'}
                  width={30}
                  height={30}
                  props={{
                    onClick: () => {
                      setSaveChanges(true)
                    }
                  }}
                  className={styles.desktop_wrapper_buttons_btn}
                />
              </div>
                )}
          </div>
        </>
            )}
      <div className={styles.list}>
        {departmentsState.map((department) =>
          !isEditing
            ? (
            <CardDepartment
              element={department}
              key={department.id}
              onClick={() => {
                handleCardClick(department.id)
              }}
            />
              )
            : (
            <CardDepartmentEdit
              element={department}
              key={department.id}
              updateDepartment={handleDepartmentChanges}
              deleteDepartment={handleDepartmentDelete}
            />
              )
        )}
      </div>
        <Modal
          isOpen={isCancelOpen}
          onConfirm={() => {
            setDepartmentsState(departments)
            setCancelChanges(false)
            setIsEditing(false)
          }}
          onCancel={() => {
            setDepartmentsState(departments)
            setCancelChanges(false)
            setIsEditing(false)
            toggle()
          }}
          toggle={toggle}
        >
          <h3>Atención</h3>
          <p>
            ¿Estás seguro que quieres cancelar los cambios? Hay modificaciones
            sin guardar.
          </p>
        </Modal>
    </div>
  )
}
