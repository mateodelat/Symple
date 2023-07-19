'use client'

import { useState } from 'react'
import Image from 'next/image'

import styles from './Header.module.scss'

export default function Header (): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className={styles.header}>
      <aside className={`${styles.header_aside} ${isMenuOpen ? styles.header_aside_open : ''}`}>
        <button
          className={styles.header_aside_button}
          type='button'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <nav className={styles.header_aside_nav}>
          <Image src='https://unavatar.io/sindresorhus@gmail.com' width={100} height={100} alt='Enterprise logo' className={styles.header_aside_nav_image} />
          <div className={styles.header_aside_nav_departments}>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
          <div className={styles.header_aside_nav_configuration}>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
        </nav>
      </aside>
      <button className={styles.header_button} type='button' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className={`${styles.header_button_hamburger} ${isMenuOpen ? styles.header_button_hamburger_open : ''}`} />
      </button>
      <div>
        FOTO
      </div>
      <div>
        BOTONES
      </div>
    </header>
  )
}
