import Image from 'next/image'

import Card from '@components/shared/Card'
import { type CardUserProps } from '@/types'
import styles from './CardUser.module.scss'

export default function CardUser ({
  element,
  onClick,
  children
}: CardUserProps): JSX.Element {
  return (
    <Card onClick={onClick}>
      <Image
        src={
          element.avatar === undefined || element.avatar === ''
            ? '/placeholder.svg'
            : element.avatar
        }
        width={100}
        height={100}
        alt={`Foto de usuario ${element.name}`}
        className={styles.card_image}
      />
      <div className={styles.card_text}>
        <h2 className={styles.card_text_title}>{element.name}</h2>
        <p className={styles.card_text_user}>{element.email}</p>
      </div>
      {children}
    </Card>
  )
}
