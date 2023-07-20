'use client'

import { Aside, Button } from '../index'
import { links } from '@/constants/index'
import styles from './Header.module.scss'

export default function Header (): JSX.Element {
  return (
    <header className={styles.header}>
      <Aside links={links.headerNavLinks} />
      {/* <div className={styles.header_image}>
        <Image
          src='https://unavatar.io/sindresorhus@gmail.com'
          width={100}
          height={100}
          alt='Enterprise logo'
          className={styles.nav_image_container}
        />
      </div> */}
      <div className={styles.header_buttons}>
        <Button className={styles.header_buttons_btn}>
          <svg
            viewBox='0 0 1024 1024'
            fill='currentColor'
            height='1em'
            width='1em'
          >
            <path d='M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z' />
          </svg>
        </Button>
        <Button className={styles.header_buttons_btn}>
          <svg fill='none' viewBox='0 0 24 24' height='1em' width='1em'>
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M12.226 2.003a9.971 9.971 0 00-7.297 2.926c-3.905 3.905-3.905 10.237 0 14.142 3.905 3.905 10.237 3.905 14.142 0a9.972 9.972 0 002.926-7.297 10.037 10.037 0 00-.337-2.368 14.87 14.87 0 01-1.744 1.436c-1.351.949-2.733 1.563-3.986 1.842-1.906.423-3.214.032-3.93-.684-.716-.716-1.107-2.024-.684-3.93.279-1.253.893-2.635 1.841-3.986.415-.592.894-1.177 1.437-1.744-.776-.207-1.571-.32-2.368-.337zm5.43 15.654a7.964 7.964 0 002.251-4.438c-3.546 2.045-7.269 2.247-9.321.195-2.052-2.052-1.85-5.775.195-9.321a8 8 0 106.876 13.564z'
              clipRule='evenodd'
            />
          </svg>
        </Button>
        <Button className={`${styles.header_buttons_btn} ${styles.header_buttons_btn_text}`}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  )
}
