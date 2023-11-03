'use client'

import { type UseCheckErrors, type UseCheckErrorsProps } from '@/types'
import { useState } from 'react'

const possibleErrors = {
  required: 'El campo es requerido',
  numeric: 'El campo debe ser numérico',
  percentage: 'El campo no puede tener más de dos decimales',
  min: 'El campo no puede ser menor a 0',
  max: 'El campo no puede ser mayor a 100'
}

const { max, min, numeric, percentage, required } = possibleErrors

export default function useCheckErrors ({
  fields
}: UseCheckErrorsProps): UseCheckErrors {
  const [errors, setErrors] = useState<Record<string, string>>(fields)

  const handleErrors = (
    name: string,
    value: string,
    isNumber: boolean,
    isPercentage: boolean
  ): void => {
    let error = ''
    if (value === '') error = required
    else if (isNaN(Number(value)) && isNumber) error = numeric
    else if (
      value !== '' &&
      !/^-?\d+(\.\d{0,2})?$/.test(value) &&
      isNumber &&
      isPercentage
    ) {
      error = percentage
    } else if (Number(value) <= 0 && isPercentage) error = min
    else if (Number(value) > 100 && isPercentage) error = max

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }))
  }

  return {
    errors,
    handleErrors
  }
}
