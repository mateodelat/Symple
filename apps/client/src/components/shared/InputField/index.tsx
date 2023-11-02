'use client'

import { type InputFieldProps } from '@/types'
import styles from './InputField.module.scss'

export default function InputField ({
  params,
  showLabel = false,
  showError = false,
  labelClassName = '',
  error = ''
}: InputFieldProps): JSX.Element {
  return (
    <>
      {showLabel && (
        <label htmlFor={params.id} className={`${styles.label} ${labelClassName}}`}>
          <strong className={styles.label_content}>{params.placeholder}</strong>
        </label>
      )}
      <input
        type="text"
        {...params}
      />
      {showError && error !== '' && (
        <span className={styles.error}>
          {error}
        </span>
      )}
    </>
  )
}
