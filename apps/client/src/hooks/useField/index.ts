'use client'
import React, { useState } from 'react'
import { Field, FieldProps } from '@/../types'

export const useField = ({ type, placeholder, name, required }: FieldProps): Field => {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value)

  return { type, placeholder, name, required, value, onChange }
}
