import Link from 'next/link'

import styles from './NotFound.module.scss'

export default function NotFoundPage (): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>404 - Página no encontrada</h1>
      <Link href="/">Volver al inicio.</Link>
    </div>
  )
}
