import styles from './Popup.module.scss'
import { type PopupProps } from '@/types'

export default function Popup ({ children, togglePopup }: PopupProps): JSX.Element {
  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popup_content}>{children}</div>
      </div>
      <button
        className={styles.button}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          togglePopup()
        }}
      ></button>
    </>
  )
}
