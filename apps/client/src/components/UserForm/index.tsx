// import { Form } from "@components/index";
import styles from "./UserForm.module.scss";

export default function UserForm(): JSX.Element {
  return (
    <div className={styles.form}>
      <h3 className={styles.form_title}>Registrar usuario nuevo</h3>
      <span className={styles.form_description}>
        Registra un usuario nuevo con su correo y contraseña.
      </span>
      {/* <Form></Form> */}
    </div>
  );
}
