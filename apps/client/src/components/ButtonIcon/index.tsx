import Image from 'next/image'

import { Button } from '@components/index'
import { type ButtonIconProps } from '@/types'
import styles from './ButtonIcon.module.scss'

export default function ButtonIcon ({
  icon,
  height = 20,
  width = 20,
  className = '',
  props
}: ButtonIconProps): JSX.Element {
  return (
    <Button
      props={props}
      className={`${styles.icon} ${className}`}
      style={{
        width: `${width + 10}px`,
        height: `${height + 10}px`
      }}
    >
      <Image src={icon} alt="Icon" width={width} height={height} />
    </Button>
  )
}
