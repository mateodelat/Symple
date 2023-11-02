'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { type NavigationProps } from '@/types'
import styles from './Navigation.module.scss'
import { useSession } from 'next-auth/react'

export default function Navigation ({
  links,
  toggleAside
}: NavigationProps): JSX.Element {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <section className={styles.main}>
      <nav className={styles.main_nav}>
        <div className={styles.main_nav_image}>
          <Image
            src="https://unavatar.io/sindresorhus@gmail.com"
            width={100}
            height={100}
            alt="Enterprise logo"
            className={styles.nav_image_container}
          />
        </div>
        <ul className={styles.main_nav_list}>
          {links.map(({ href, label, roleRestriction }) => (
            <li className={`${styles.main_nav_list_element} ${(roleRestriction !== undefined && status === 'authenticated') && roleRestriction !== session?.user.role ? styles.hidden : ''}`} key={label}>
              <Link
                href={href}
                onClick={toggleAside}
                className={`${styles.main_nav_list_element_link} ${
                  pathname === href
                    ? styles.main_nav_list_element_link_active
                    : ''
                }`}
              >
                {label}
              </Link>
            </li>
          )
          )}
        </ul>
      </nav>
    </section>
  )
}
