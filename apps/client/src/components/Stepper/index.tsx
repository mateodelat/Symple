'use client'

import { type StepperProps } from '@/types'
import styles from './Stepper.module.scss'
import { useState } from 'react'

export default function Stepper ({ steps, currentStep }: StepperProps): JSX.Element {
  const [current, setCurrent] = useState(0)

  return (
    <div className={styles.stepper}>
      <span
        className={styles.stepper_container_title}
      >
        {steps[current].name}
      </span>
      <div className={styles.stepper_container}>
        {steps.map(({ index }) => {
          return (
          <>
            <button
              className={`${styles.stepper_container_button} ${index <= current ? styles.stepper_container_button_active : ''}`}
              onClick={() => { setCurrent(index) }}
            />
            {index !== steps.length - 1 && (
              <div className={`${styles.stepper_container_connector} ${index < current ? styles.stepper_container_button_active : ''}`}/>
            )}
          </>
          )
        })}
      </div>
    </div>
  )
}
