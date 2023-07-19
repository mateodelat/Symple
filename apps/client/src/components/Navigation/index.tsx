'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { NavigationProps } from '@/types'
import styles from './Navigation.module.scss'

export default function Navigation ({ topLinks, bottomLinks, toggleAside }: NavigationProps): JSX.Element {
  const pathname = usePathname()

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div
          className={styles.nav_image}
        >
          <Image
            src='https://unavatar.io/sindresorhus@gmail.com'
            width={100}
            height={100}
            alt='Enterprise logo'
            className={styles.nav_image_container}
          />
        </div>
        <div className={styles.nav_departments}>
          <ul className={styles.nav_departments_list}>
            {topLinks.map(({ href, label }) => (
              <li
                className={`${styles.nav_departments_list_element} ${pathname === href ? styles.nav_departments_list_element_active : ''}`} key={label}
              >
                <Link href={href} onClick={toggleAside}>{label}</Link>
              </li>
            ))}
          </ul>
          <ul className={styles.nav_departments_list}>
            {bottomLinks.map(({ href, label }) => (
              <li
                className={`${styles.nav_departments_list_element} ${pathname === href ? styles.nav_departments_list_element_active : ''}`} key={label}
              >
                <Link href={href} onClick={toggleAside}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
