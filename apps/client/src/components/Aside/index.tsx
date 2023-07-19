'use client'

import { useState } from 'react'

import { Navigation } from '../index'
import styles from './Aside.module.scss'
import { AsideProps } from '@/types'

export default function Aside ({ links }: AsideProps): JSX.Element {
  const { bottomLinks, topLinks } = links
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleAside = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
      <aside className={`${styles.aside} ${isMenuOpen ? styles.aside_open : ''}`}>
        <button
          className={styles.aside_button}
          type='button'
          onClick={handleToggleAside}
        />
        <Navigation topLinks={topLinks} bottomLinks={bottomLinks} toggleAside={handleToggleAside} />
      </aside>
      <button className={styles.button} type='button' onClick={handleToggleAside}>
        <span className={`${styles.button_hamburger} ${isMenuOpen ? styles.button_hamburger_open : ''}`} />
      </button>
    </>
  )
}
