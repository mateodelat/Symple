'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import styles from './BackButton.module.scss'

export default function BackButton (): JSX.Element {
  const { back } = useRouter()
  return (
    <button className={styles.back} onClick={back} type="button">
      <Image
        src={'/back_arrow.svg'}
        alt="Flecha hacia atrás"
        width={30}
        height={30}
      />
    </button>
  )
}
