'use client'

import { type StepperProps } from '@/types'
import styles from './Stepper.module.scss'
import { Fragment } from 'react'
import { useWindowResize } from '@hooks/index'

export default function Stepper ({
  steps,
  currentStep,
  nextStep,
  previousStep,
  checkErrors,
  fieldNames
}: StepperProps): JSX.Element {
  const { windowSize } = useWindowResize()

  const handleSteps = async (index: number): Promise<void> => {
    if (checkErrors !== undefined && index > currentStep) {
      const isValid = await checkErrors(fieldNames ?? [])
      if (!isValid) return
    }
    if (index < currentStep) previousStep(index)
    else if (index > currentStep) nextStep()
  }

  return (
    <div className={styles.stepper}>
      {windowSize < 1024 && (
        <span className={styles.stepper_container_title}>
          {steps[currentStep].name}
        </span>
      )}
      {windowSize < 1024
        ? (
        <div className={styles.stepper_container}>
          {steps.map(({ index }) => {
            return (
              <Fragment key={index}>
                <button
                  className={`${styles.stepper_container_button} ${
                    index <= currentStep
                      ? styles.stepper_container_button_active
                      : ''
                  }`}
                  onClick={() => {
                    handleSteps(index)
                      .then(() => {})
                      .catch(() => {})
                  }}
                  disabled={currentStep + 1 < index}
                  type="button"
                />
                {index !== steps.length - 1 && (
                  <div
                    className={`${styles.stepper_container_connector} ${
                      index < currentStep
                        ? styles.stepper_container_button_active
                        : ''
                    }`}
                  />
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
                <div className={styles.wrapper}>
                  <button
                    className={`${styles.stepper_container_button} ${
                      index <= currentStep
                        ? styles.stepper_container_button_active
                        : ''
                    }`}
                    onClick={() => {
                      void handleSteps(index)
                    }}
                    disabled={currentStep + 1 < index}
                    type="button"
                  />
                  <span className={styles.stepper_container_title}>
                    {steps[index].name}
                  </span>
                  {index !== steps.length - 1 && (
                    <div
                      className={`${styles.stepper_container_connector} ${
                        index < currentStep
                          ? styles.stepper_container_button_active
                          : ''
                      }`}
                    />
                  )}
                </div>
              </Fragment>
            )
          })}
        </aside>
          )}
    </div>
  )
}
