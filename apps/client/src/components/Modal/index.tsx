'use client'

import { useRef, useEffect } from 'react'
import { Button } from '@components/index'

import { type ModalProps } from '@/types'
import styles from './Modal.module.scss'

export default function Modal ({
  isOpen,
  toggle,
  onConfirm,
  onCancel = () => {},
  children,
  className = ''
}: ModalProps): JSX.Element {
  useEffect(() => {
    if (isOpen) ref.current?.showModal()
  }, [isOpen])

  const ref = useRef<HTMLDialogElement>(null)

  const handleConfirm = (): void => {
    handleClick()
    setTimeout(() => {
      onConfirm()
    }, 150)
  }

  const handleCancel = (): void => {
    handleClick()
    onCancel()
  }

  const handleClick = (): void => {
    ref.current?.classList.add(styles.modal_close)
    setTimeout(() => {
      toggle()
      ref.current?.close()
    }, 150)
  }

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>): void => {
    e.stopPropagation()
    if (e.target === ref.current) handleCancel()
  }
  return (
    <dialog
      ref={ref}
      className={`${styles.modal} ${className}`}
      onClick={handleDialogClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation()
          handleCancel()
        }
      }}
    >
      <div className={styles.modal_content}>
        <Button className={styles.modal_content_close} onClick={handleCancel}>
          <div className={styles.modal_content_close_button} />
        </Button>
        {children}
        <Button onClick={handleConfirm} className={styles.modal_content_accept}>
          Confirmar
        </Button>
      </div>
    </dialog>
  )
}
