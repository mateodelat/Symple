import { Form } from '@components/index'
import { type AddRoleProps } from '@/types'
import styles from './AddRole.module.scss'
import { roleSections, roleSchema, roleSteps } from '@/constants/RoleForm'

export default function AddRole ({ isEditing }: AddRoleProps): JSX.Element {
  return (
    <section className={styles.modal}>
      <h1>{!isEditing ? 'Nuevo' : 'Editar'} rol</h1>
      <div className={styles.modal_content}>
        <Form
          schema={roleSchema}
          sections={roleSections}
          onSubmit={(data) => {
            console.log(data)
          }}
          isStepper
          steps={roleSteps}
          className={styles.modal_content_form}
        />
      </div>
    </section>
  )
}
