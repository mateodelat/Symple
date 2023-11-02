import Image from 'next/image'

import { ButtonIcon, InputField } from '@components/shared/'
import { type DraggableInputProps } from '@/types'
import styles from './DraggableInput.module.scss'

export default function DraggableInput ({
  dragHandleProps,
  value,
  canBeDeleted,
  handleUpdate,
  handleErrors,
  deleteElement,
  fieldName,
  placeholder,
  errorName,
  index
}: DraggableInputProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div {...dragHandleProps} className={styles.wrapper_button}>
        <Image
          src={'/grip_horizontal.svg'}
          alt="Arrastrar elemento"
          width={20}
          height={20}
        />
      </div>
      <InputField
        params={{
          placeholder,
          value,
          onChange: (e) => {
            handleUpdate(e.target.value, fieldName)
            handleErrors(errorName, e.target.value, false, false)
          }
        }}
      />
      <ButtonIcon
        icon={'/trash_bin.svg'}
        width={20}
        height={20}
        props={{
          disabled: !canBeDeleted,
          onClick: () => {
            deleteElement(index)
          }
        }}
      />
    </div>
  )
}
