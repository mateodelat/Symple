'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forwardRef, useEffect, useImperativeHandle } from 'react'

import { Button, FormSection, Stepper } from '@components/shared/'
import { type FormProps } from '@/types'
import styles from './Form.module.scss'
import { useStepper } from '@/hooks'

const Form = forwardRef(({
  sections,
  schema,
  buttonSubmit = 'Enviar',
  onSubmit,
  className = '',
  fieldsClassName = '',
  children,
  setFormMethods,
  files,
  handleFiles,
  customFields,
  isStepper = false,
  steps = []
}: FormProps, ref): JSX.Element => {
  const formMethods = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = formMethods

  useEffect(() => {
    if (setFormMethods !== undefined) {
      setFormMethods(formMethods)
    }
  }, [setFormMethods])

  const { currentStep, nextStep, previousStep, reset, isBlocked } = useStepper()

  const checkErrors = async (fieldsToCheck: string[]): Promise<boolean> => {
    const isValid = await trigger(fieldsToCheck)
    return isValid
  }

  useImperativeHandle(ref, () => {
    return {
      reset,
      isBlocked
    }
  })

  return (
    <div className={styles.container}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.container_form} ${isStepper ? styles.container_form_stepper : ''} ${className}`}
      >
        {isStepper && (
          <Stepper
            steps={steps}
            currentStep={currentStep}
            nextStep={nextStep}
            previousStep={previousStep}
            checkErrors={checkErrors}
            fieldNames={sections.at(currentStep)?.fields.map(({ name }) => name)}
          />
        )}
        {sections.map(({ title, fields, className = '' }, i) => {
          return (
            isStepper
              ? currentStep === i && (
                <FormSection
                  title={title}
                  fields={fields}
                  fieldsClassName={`${fieldsClassName} ${className}`}
                  register={register}
                  errors={errors}
                  customFields={customFields}
                  files={files}
                  handleFiles={handleFiles}
                  key={title.name}
                >
                  {currentStep === steps.length - 1
                    ? (
                        <Button
                          className={styles.container_form_button}
                          type="submit"
                        >
                          {buttonSubmit}
                        </Button>
                      )
                    : (
                        <Button
                          className={styles.container_form_button}
                          onClick={async () => {
                            // if(fields.some(({elementType}) => elementType === 'custom'))
                            const isValid = await checkErrors(fields.map(({ name }) => name))
                            if (isValid) nextStep()
                          }}
                        >
                          Siguiente
                        </Button>
                      )}
                </FormSection>
              )
              : (
                <FormSection
                  title={title}
                  fields={fields}
                  fieldsClassName={fieldsClassName}
                  register={register}
                  errors={errors}
                  customFields={customFields}
                  files={files}
                  handleFiles={handleFiles}
                  key={title.name}
                />
                )
          )
        })}
        {children}
        {!isStepper && (
          <Button
            className={styles.container_form_button}
            type="submit"
          >
            {buttonSubmit}
          </Button>
        )}
      </form>
    </div>
  )
})

export default Form
