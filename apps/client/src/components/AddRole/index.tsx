import { Stepper } from '@components/index'
import { type AddRoleProps } from '@/types'
import styles from './AddRole.module.scss'

export default function AddRole ({ isEditing }: AddRoleProps): JSX.Element {
  return (
    <section className={styles.modal}>
      <h1>{!isEditing ? 'Nuevo' : 'Editar'} rol</h1>
      <Stepper
        steps={
          [
            { index: 0, name: 'Detalles' },
            { index: 1, name: 'Indicadores' },
            { index: 2, name: 'Entregables' },
            { index: 3, name: 'Funciones' }
          ]}
        currentStep={0}
      />
    </section>
  )
}
