'use client'

import { useEffect, useRef, useState } from 'react'

import {
  AccordionList,
  Button,
  Loader,
  Modal,
  SearchBar
} from '@components/shared/'
import AddRole from '@components/modules/Role/AddRole'
import { useToggle } from '@/hooks'
import { internalLinks } from '@/constants/DepartmentAdministration'
import {
  type LengthType,
  type DepartmentAdministrationProps,
  type Role
} from '@/types'
import styles from './DepartmentAdministration.module.scss'
import { useRoleContext } from '@/contexts/Role/context'
import RoleMenuItems from '@/constants/RoleMenuItems'
import toast from 'react-hot-toast'
import rolesService from '@/services/roles'

export default function DepartmentAdministration ({
  id
}: DepartmentAdministrationProps): JSX.Element {
  const deleteId = useRef<string | null>(null)
  const { toggle, value } = useToggle()
  const { toggle: toggleCancel, value: confirmCancel } = useToggle()
  const { toggle: toggleDelete, value: confirmDelete } = useToggle()

  const { deleteRole } = useRoleContext()
  const { handleDepartmentChange, roles, department, isLoading } =
    useRoleContext()

  const [filter, setFilter] = useState('')
  const [links, setLinks] = useState(internalLinks)
  const [selectedElement, setSelectedElement] = useState<Role | null>(null)
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([])

  const lengths: Record<LengthType, string> = {
    roles: filteredRoles.length.toString(),
    members: '0', // TODO: get members length
    positions: '0' // TODO: get positions length
  }

  const handleActive = (name: string): void => {
    setLinks((prev) => {
      const newLinks = structuredClone(prev)
      newLinks.forEach((link) => {
        if (link.name === name) link.isActive = true
        else link.isActive = false
      })
      return newLinks
    })
  }

  const element = links.find((link) => link.isActive)
  const name = element?.label.toLowerCase() ?? ''
  const active = element?.name ?? 'members'
  const singularName = element?.singularLabel.toLowerCase() ?? ''

  const modalRef = useRef()

  const handleEditRole = (id: string): void => {
    setSelectedElement(roles.find((role) => role.id === id) ?? null)
    toggle()
  }

  const handleDeleteRoleModal = (id: string): void => {
    toggleDelete()
    deleteId.current = id
  }

  const handleData = (filter: string): void => {
    if (filter === '') {
      setFilteredRoles(roles)
      return
    }
    setFilteredRoles(() =>
      roles.filter(({ name }) => {
        const nameToLower = name.toLowerCase()
        const filterToLower = filter.toLowerCase()

        return (
          nameToLower.startsWith(filterToLower) ||
          nameToLower.endsWith(filterToLower)
        )
      })
    )
  }

  const handleDeleteRole = async (): Promise<void> => {
    const roleId = deleteId.current
    if (roleId !== null) {
      await toast.promise(rolesService.deleteRole(roleId), {
        loading: 'Creando rol...',
        error: (err: any) => {
          toggle()
          return `Ocurrió un error al eliminar el rol: ${
            err.message as string
          }`
        },
        success: (response) => {
          deleteRole(roleId)
          return response.message
        }
      })
    }
  }

  useEffect(() => {
    handleDepartmentChange(id)
  }, [id])

  useEffect(() => {
    if (!value) setSelectedElement(null)
  }, [value])

  useEffect(() => {
    console.log(roles)
    if (!isLoading) {
      setFilteredRoles(roles)
    }
  }, [isLoading, roles])

  return (
    <section className={styles.container}>
      <div className={styles.container_nav}>
        <h1>Administración</h1>
        <ul className={styles.container_nav_list}>
          {links.map(({ label, name, isActive }) => (
            <li
              key={name}
              className={`${styles.container_nav_list_item} ${
                isActive ? styles.container_nav_list_item_active : ''
              }`}
            >
              <button
                onClick={() => {
                  handleActive(name)
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <SearchBar
        filter={filter}
        handleData={handleData}
        setFilter={setFilter}
      />
      <div className={styles.container_wrapper}>
        <span className={styles.container_wrapper_length}>
          <strong>{`${lengths[active]} ${name ?? ''}`}</strong>
        </span>
        <Button
          className={styles.container_wrapper_create}
          onClick={() => {
            toggle()
          }}
        >
          Nuevo {singularName}
        </Button>
      </div>
      <div className={styles.container_lists}>
        {element?.name === 'members' && <div>MembersList</div>}
        {element?.name === 'positions' && <div>PositionsList</div>}
        {element?.name === 'roles' &&
          (isLoading
            ? (
            <div className={styles.loader}>
              <h3>Cargando...</h3>
              <Loader />
            </div>
              )
            : (
            <AccordionList
              data={filteredRoles}
              cardType="role"
              menuItems={RoleMenuItems}
              actions={{ edit: handleEditRole, delete: handleDeleteRoleModal }}
            />
              ))}
      </div>

      <Modal
        isOpen={value}
        onCancel={toggleCancel}
        toggle={toggle}
        hasConfirmButton={false}
        ref={modalRef}
        className={styles.container_modal}
        showCancelConfirmation
      >
        {element?.name === 'roles' && (
          <AddRole
            selectedElement={selectedElement}
            isOpen={value}
            toggle={toggle}
            department={department}
          />
        )}
      </Modal>
      <Modal
        isOpen={confirmCancel}
        onConfirm={toggle}
        toggle={toggleCancel}
        hasConfirmButton={true}
        className={styles.container_modal_cancel}
      >
        ¿Seguro que quieres salir?
      </Modal>
      <Modal
        isOpen={confirmDelete}
        onConfirm={handleDeleteRole}
        toggle={toggleDelete}
        hasConfirmButton={true}
        className={styles.container_modal_cancel}
      >
        ¿Seguro que quieres eliminar el elemento?
      </Modal>
    </section>
  )
}
