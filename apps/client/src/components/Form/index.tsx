'use client'
import React from 'react'
import Link from 'next/link'

import { Field } from '@/types'
import styles from './Form.module.scss'
interface Props {
  fields: Field[]
  buttonSave?: string
}

export default function Form ({ fields, buttonSave = 'Enviar' }: Props): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {fields.map(({ name, ...field }) =>
        <input key={name} {...field} className={styles.form_input} />
      )}
      {
        /*
          --- TODO ---
          Change this Link to a button that executes the method to authenticate the user
        */
      }
      <Link href='/enterprises' className={styles.form_button}>{buttonSave}</Link>
    </form>
  )
}
