import { type AddRoleProps } from '@/types'
import styles from './AddRole.module.scss'

export default function AddRole ({ isEditing }: AddRoleProps): JSX.Element {
  return (
    <section className={styles.modal}>
      <h1>{!isEditing ? 'Nuevo' : 'Editar'} rol</h1>
    </section>
  )
}
