'use client'

import { useState } from 'react'

import { type UseStepper } from '@/types'

export default function useStepper (): UseStepper {
  const [isBlocked, setIsBlocked] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const toggleBlocked = (value: boolean): void => {
    setIsBlocked(value)
  }

  const nextStep = (): void => {
    if (!isBlocked) setCurrentStep((prev) => prev + 1)
  }

  const previousStep = (index?: number): void => {
    setCurrentStep((prev) => index ?? prev - 1)
    setIsBlocked(false)
  }

  const reset = (): void => { setCurrentStep(0) }
  return {
    currentStep,
    nextStep,
    previousStep,
    reset,
    isBlocked,
    setIsBlocked: toggleBlocked
  }
}
