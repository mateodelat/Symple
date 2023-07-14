'use client'

import React, { useState } from 'react'

export const useField = (type: string): {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
} => {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(e.target.value)

  return { value, onChange, type }
}
