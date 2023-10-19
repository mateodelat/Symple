'use client'

import { useState } from 'react'

import { AddRole, Button, Modal, SearchBar } from '@components/index'
import { useModal, useToggle } from '@/hooks'
import { internalLinks } from '@/constants/DepartmentAdministration'
import { type DepartmentAdministrationProps } from '@/types'
import styles from './DepartmentAdministration.module.scss'

export default function DepartmentAdministration ({
  id
}: DepartmentAdministrationProps): JSX.Element {
  const [filter, setFilter] = useState('')
  const [links, setLinks] = useState(internalLinks)

  const { toggle, value } = useToggle()
  const {
    handleCancel,
    handleClick,
    handleConfirm,
    handleDialogClick,
    ref
  } = useModal({ toggle, onCancel: () => {}, onConfirm: () => {} })

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
      <SearchBar filter={filter} handleData={() => {}} setFilter={setFilter} />
      <Button className={styles.container_create} onClick={toggle}>
        Nuevo {element?.label.toLowerCase()}
      </Button>
      {value && (
        <Modal
          isOpen={value}
          onConfirm={() => {}}
          toggle={toggle}
          hasConfirmButton={false}
        >
          {element?.name === 'roles' && (
            <AddRole
              isEditing={false}
            />
          )}
        </Modal>
      )}
    </section>
  )
}
