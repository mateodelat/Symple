import Image from 'next/image'

import { Button } from '@components/index'
import { type ButtonIconProps } from '@/types'
import styles from './ButtonIcon.module.scss'

export default function ButtonIcon ({
  icon,
  onClick,
  height = 20,
  width = 20,
  className = ''
}: ButtonIconProps): JSX.Element {
  return (
    <Button onClick={onClick} className={`${styles.icon} ${className}`}>
      <Image src={icon} alt="Icon" width={width} height={height} />
    </Button>
  )
}
