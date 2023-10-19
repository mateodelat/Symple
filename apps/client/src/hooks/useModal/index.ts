'use client'

import { useRef } from 'react'
import styles from '@styles/useModal.module.scss'
import { type UseModal, type UseModalProps } from '@/types'

export default function useModal ({ onConfirm, onCancel, toggle }: UseModalProps): UseModal {
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

  return {
    ref,
    handleConfirm,
    handleCancel,
    handleClick,
    handleDialogClick
  }
}
