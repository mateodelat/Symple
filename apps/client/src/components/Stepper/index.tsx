'use client'

import { type StepperProps } from '@/types'
import styles from './Stepper.module.scss'
import { Fragment } from 'react'
import { useWindowResize } from '@hooks/index'

export default function Stepper ({ steps, currentStep, nextStep, previousStep }: StepperProps): JSX.Element {
  const { windowSize } = useWindowResize()

  const handleSteps = (index: number): void => {
    if (index < currentStep) previousStep(index)
    else if (index > currentStep) nextStep()
  }

  return (
    <div className={styles.stepper}>
      {windowSize < 768 && (
        <span
          className={styles.stepper_container_title}
        >
          {steps[currentStep].name}
        </span>
      )}
      {windowSize < 768
        ? (
        <div className={styles.stepper_container}>
          {steps.map(({ index }) => {
            return (
            <Fragment key={index}>
              <button
                className={`${styles.stepper_container_button} ${index <= currentStep ? styles.stepper_container_button_active : ''}`}
                onClick={() => { handleSteps(index) }}
                disabled={currentStep + 1 < index}
              />
              {index !== steps.length - 1 && (
                <div className={`${styles.stepper_container_connector} ${index < currentStep ? styles.stepper_container_button_active : ''}`}/>
              )}
            </Fragment>
            )
          })}
        </div>
          )
        : (
        <aside className={styles.stepper_container}>
          {steps.map(({ index }) => {
            return (
            <Fragment key={index}>
              <button
                className={`${styles.stepper_container_button} ${index <= currentStep ? styles.stepper_container_button_active : ''}`}
                onClick={() => { handleSteps(index) }}
                disabled={currentStep + 1 < index}
              >
                {index === currentStep && (
                  <span
                    className={styles.stepper_container_title}
                  >
                    {steps[currentStep].name}
                  </span>
                )}
              </button>
              {index !== steps.length - 1 && (
                <div className={`${styles.stepper_container_connector} ${index < currentStep ? styles.stepper_container_button_active : ''}`}/>
              )}
            </Fragment>
            )
          })}
        </aside>
          )}
    </div>
  )
}
