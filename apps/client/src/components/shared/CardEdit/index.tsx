'use client'

import { Card, VerticalButton, Popup } from '@components/shared/'
import { type CardEditProps } from '@/types'
import styles from './CardEdit.module.scss'
import useToggle from '@hooks/useToggle'
import Link from 'next/link'
import Image from 'next/image'

export default function CardEdit ({
  children,
  menuItems,
  onClick,
  cardClassName = '',
  actions,
  elementId
}: CardEditProps): JSX.Element {
  const { toggle, value } = useToggle()

  return (
    <Card className={`${styles.card} ${cardClassName}`} onClick={onClick}>
      <VerticalButton className={styles.vertical} onClick={toggle}/>
      {value && (
        <Popup togglePopup={toggle}>
          <ul className={styles.card_list}>
            {menuItems.map(({ id, label, icon, isLink, navigate }) => (
              <li key={label} className={styles.card_list_element}>
                <div className={styles.card_list_element_wrapper}>
                  {icon !== undefined && (
                      <Image src={icon} alt={label} width={30} height={30}/>
                  )}
                  {isLink && navigate !== undefined
                    ? (
                    <Link href={navigate}>
                      <strong>{label}</strong>
                    </Link>
                      )
                    : (
                    <button
                      className={styles.card_list_element_wrapper_button}
                      onClick={() => {
                        actions[id]?.(elementId)
                        toggle()
                      }}
                    >
                      <strong>{label}</strong>
                    </button>
                      )}
                </div>
              </li>
            ))}
          </ul>
        </Popup>
      )}
      {children}
    </Card>
  )
}
