import { type CardProps } from '@/types'
import styles from './CardDragabble.module.scss'

export default function CardDraggable ({
  children,
  className = '',
  onClick = () => {},
  title = 'Ir a detalle'
}: CardProps): JSX.Element {
  return (
    <article
      className={`${styles.draggable} ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </article>
  )
}
