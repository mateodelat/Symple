'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { Button } from '@components/index'

import { type ModalProps } from '@/types'
import styles from './Modal.module.scss'

const Modal = forwardRef(({
  isOpen,
  toggle,
  onConfirm,
  onCancel = () => {},
  children,
  className = '',
  confirmText = 'Confirmar',
  hasConfirmButton = true
}: ModalProps, ref: any): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null)

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
    dialogRef.current?.classList.toggle(styles.modal_close)
    setTimeout(() => {
      toggle()
      dialogRef.current?.close()
    }, 300)
  }

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>): void => {
    e.stopPropagation()
    if (e.target === dialogRef.current) handleCancel()
  }

  useImperativeHandle(ref, () => {
    return {
      handleConfirm
    }
  })

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
      dialogRef.current?.classList.remove(styles.modal_close)
    } else dialogRef.current?.close()
  }, [isOpen])
  return (
    <dialog
      ref={dialogRef}
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
        {hasConfirmButton && (
          <Button onClick={handleConfirm} className={styles.modal_content_accept}>
            {confirmText}
          </Button>
        )}
      </div>
    </dialog>
  )
})

export default Modal
