'use client'

import { useEffect, useRef, useState } from 'react'

import { AccordionList, Button, Modal, SearchBar } from '@components/shared/'
import AddRole from '@components/modules/Role/AddRole'
import { useToggle } from '@/hooks'
import { internalLinks } from '@/constants/DepartmentAdministration'
import { type LengthType, type DepartmentAdministrationProps } from '@/types'
import styles from './DepartmentAdministration.module.scss'
import { useRoleContext } from '@/contexts/Role/context'

export default function DepartmentAdministration ({
  id
}: DepartmentAdministrationProps): JSX.Element {
  const { toggle, value } = useToggle()
  const { toggle: toggleCancel, value: confirmCancel } = useToggle()

  const [filter, setFilter] = useState('')
  const [links, setLinks] = useState(internalLinks)

  const { handleDepartmentChange, roles, department } = useRoleContext()

  const lengths: Record<LengthType, string> = {
    roles: roles.length.toString(),
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

  useEffect(() => {
    handleDepartmentChange(id)
  }, [id])

  return (
    <section className={styles.container}>
      <div className={styles.container_nav}>
        <h1>Administración</h1>
        <ul className={styles.container_nav_list}>
          {links.map(({ label, name, isActive, singularLabel }) => (
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
      <SearchBar filter={filter} handleData={() => {}} setFilter={setFilter} />
      <div className={styles.container_wrapper}>
        <span className={styles.container_wrapper_length}><strong>{`${lengths[active]} ${name ?? ''}`}</strong></span>
        <Button className={styles.container_wrapper_create} onClick={() => { toggle() }}>
          Nuevo {singularName}
        </Button>
      </div>
      {element?.name === 'members' && (
        <div>MembersList</div>
      )}
      {element?.name === 'positions' && (
        <div>PositionsList</div>
      )}
      {element?.name === 'roles' && (
        <AccordionList data={roles} cardType='role'/>
      )}

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
              isEditing={false}
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
    </section>
  )
}
