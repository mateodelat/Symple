import { type CardRoleProps } from '@/types'
import styles from './CardRole.module.scss'
import { ButtonIcon } from '@/components/shared'
import { useToggle } from '@/hooks'

export default function CardRole ({ role }: CardRoleProps): JSX.Element {
  const { value, toggle } = useToggle()

  const toggleAccordion = (): void => {
    toggle()
  }

  return (
    <div className={styles.wrapper}>
      <span>
        <strong>{role.name}</strong>
      </span>
      <ButtonIcon
        icon={'/down-arrow.svg'}
        className={`${styles.wrapper_icon} ${value ? styles.wrapper_icon_rotate : ''}`}
        props={{ onClick: toggleAccordion }}
      />
      <div className={`${styles.wrapper_hidden} ${value ? styles.wrapper_show : ''}` }>
        <h3 className={styles.wrapper_hidden_title}>Indicadores</h3>
        {role.indicators.map(({ name, type }, i) => (
          <div
            key={`indicator-${i}`}
            className={styles.wrapper_hidden_indicator}
          >
            <span>{name}</span>
            <span>{type}</span>
          </div>
        ))}
        <h3 className={styles.wrapper_hidden_title}>Entregables</h3>
        {role.deliverables.map(({ name }, i) => (
          <div
            key={`deliverable-${i}`}
            className={styles.wrapper_hidden_indicator}
          >
            <span>{name}</span>
          </div>
        ))}
        <h3 className={styles.wrapper_hidden_title}>Funciones</h3>
        {role.functions.map(({ name }, i) => (
          <div
            key={`function-${i}`}
            className={styles.wrapper_hidden_indicator}
          >
            <span>{name}</span>
          </div>
        ))}
      </div>
      {value && (
        <button
          className={styles.button}
          type='button'
          onClick={() => { toggle() }}
        />
      )}
    </div>
  )
}
