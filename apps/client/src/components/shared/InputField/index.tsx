'use client'

import { type InputFieldProps } from '@/types'
import styles from './InputField.module.scss'

export default function InputField ({ params, showError = false, error = '' }: InputFieldProps): JSX.Element {
  return (
    <>
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
