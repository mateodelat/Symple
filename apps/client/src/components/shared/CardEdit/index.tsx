'use client'

import { Card, VerticalButton, Popup } from '@components/shared/'
import { type CardEditProps } from '@/types'
import styles from './CardEdit.module.scss'
import useToggle from '@hooks/useToggle'
import Link from 'next/link'

export default function CardEdit ({ children, menuItems, onClick }: CardEditProps): JSX.Element {
  const { toggle, value } = useToggle()

  return (
    <Card className={styles.card} onClick={onClick}>
      <VerticalButton className={styles.vertical} onClick={toggle}/>
      {value && (
        <Popup togglePopup={toggle}>
          <ul>
            {menuItems.map(({ label, icon, isLink, navigate }) => (
              <li key={label}>
                {isLink && navigate !== undefined
                  ? (
                  <Link href={navigate}>{label}</Link>
                    )
                  : (
                      label
                    )}
              </li>
            ))}
          </ul>
        </Popup>
      )}
      {children}
    </Card>
  )
}
