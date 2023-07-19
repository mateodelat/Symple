import { ButtonProps } from '@/types'
import styles from './Button.module.scss'

export default function Button ({ children, onClick = () => {}, className = '' }: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>{children}</button>
  )
}
