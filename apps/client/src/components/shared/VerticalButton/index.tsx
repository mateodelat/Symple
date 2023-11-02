'use client'

import { type VerticalButtonProps } from '@/types'
import styles from './VerticalButton.module.scss'
import React from 'react'
import { useToggle } from '@/hooks'
import Popup from '../Popup'

export default function VerticalButton ({
  actions,
  elementId,
  menuItems
}: VerticalButtonProps): JSX.Element {
  const { value: isPopupOpen, toggle: togglePopup } = useToggle()

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    togglePopup()
  }
  return (
    <>
      <button
        className={styles.button}
        onClick={handleClick}
      >
        <span className={styles.button_vertical} />
      </button>
      {isPopupOpen && (
        <>
          <Popup
            actions={actions}
            elementId={elementId}
            menuItems={menuItems}
            togglePopup={togglePopup}
          />
        </>
      )}
    </>
  )
}
