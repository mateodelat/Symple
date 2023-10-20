import { ButtonIcon, SelectField } from '@components/index'
import { type AddIndicatorProps } from '@/types'
import styles from './AddIndicator.module.scss'
import { roleIndicatorOptions } from '@/constants/RoleForm'

export default function AddIndicator ({ addedIndicators }: AddIndicatorProps): JSX.Element {
  return (
    <section className={styles.container}>
      <div className={styles.container_indicator}>
        <ButtonIcon
          icon={'/grip_horizontal.svg'}
          width={20}
          height={20}
          className={styles.container_indicator_icon_draggable}
        />
        <input type="text" placeholder='Indicador'/>
        <ButtonIcon
          icon={'/trash_bin.svg'}
          width={20}
          height={20}
          props={{
            disabled: addedIndicators.length === 0
          }}
        />
      </div>
      <SelectField name='indicatorType' options={roleIndicatorOptions}/>
    </section>
  )
}
