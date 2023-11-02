import { type LoaderProps } from '@/types'
import styles from './Loader.module.scss'

export default function Loader ({ className = '' }: LoaderProps): JSX.Element {
  return <div className={`${styles.loader} ${className}`} />
}
