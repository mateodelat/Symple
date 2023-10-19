import { As, UploadFile } from '@components/index'
import { type FileState, type FormSectionProps } from '@/types'
import styles from './FormSection.module.scss'

export default function FormSection ({
  title,
  fields,
  fieldsClassName,
  register,
  errors,
  files,
  handleFiles,
  customFields,
  children
}: FormSectionProps): JSX.Element {
  return (
    <div key={title.name} className={styles.section}>
      <As name={title.name} as={title.as} style={title.style} />
      <div
        className={`${styles.section_fields} ${fieldsClassName}`}
      >
        {fields.map(
          ({
            name,
            type = 'text',
            label,
            placeholder,
            elementType,
            options,
            props,
            style = {}
          }) => (
            <div
              key={name}
              className={styles.section_wrapper}
              style={{ ...style }}
            >
              <label
                htmlFor={name}
                className={styles.section_wrapper_label}
              >
                <strong
                  className={
                    styles.section_wrapper_label_text
                  }
                >
                  {label}
                </strong>
              </label>
              {elementType === 'select'
                ? (
                <select
                  id={name}
                  {...props}
                  {...register(name)}
                  className={
                    styles.section_wrapper_input
                  }
                >
                  {options?.map(({ id, label }) => {
                    return (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    )
                  })}
                </select>
                  )
                : elementType === 'file'
                  ? (
                <UploadFile
                  file={
                    files?.find(
                      (file) => file.name === name
                    ) as FileState
                  }
                  handleSelectedFile={handleFiles ?? (() => {})}
                  id={name}
                  props={props ?? {}}
                />
                    )
                  : elementType === 'textarea'
                    ? (
                        <textarea
                          id={name}
                          placeholder={placeholder}
                          {...register(name)}
                          {...props}
                          className={
                            `${styles.section_wrapper_input} ${styles.section_wrapper_textarea}`
                          }
                        />
                      )
                    : elementType === 'custom'
                      ? (
                          customFields?.[name]()
                        )
                      : (
                          <input
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            {...register(name)}
                            {...props}
                            className={
                              styles.section_wrapper_input
                            }
                          />
                        )
              }
              {errors[name] !== null && (
                <span
                  className={
                    styles.section_wrapper_error
                  }
                >
                  {errors[name]?.message as string}
                </span>
              )}
            </div>
          )
        )}
      </div>
      {children}
    </div>
  )
}
