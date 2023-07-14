import Link from 'next/link'
import styles from './Navigation.module.scss'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/posts', label: 'Posts' }
]

export const Navigation = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.header_list}>
          {links.map(({ href, label }) =>
            <li key={label}>
              <Link href={href}>{label}</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
