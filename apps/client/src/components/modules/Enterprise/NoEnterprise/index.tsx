import styles from "./NoEnteprise.module.scss";

export default function NoEnterprise(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>No tienes empresa asignada...</h1>
      <p>
        Contacta con un administrador del sistema para más ayuda y/o
        información.
      </p>
    </div>
  );
}
