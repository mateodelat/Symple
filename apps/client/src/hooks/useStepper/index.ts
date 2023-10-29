'use client'

import { useState } from 'react'

import { type UseStepper } from '@/types'

export default function useStepper (): UseStepper {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const nextStep = (): void => { setCurrentStep((prev) => prev + 1) }

  const previousStep = (index?: number): void => { setCurrentStep((prev) => index ?? prev - 1) }

  return {
    currentStep,
    nextStep,
    previousStep
  }
}
