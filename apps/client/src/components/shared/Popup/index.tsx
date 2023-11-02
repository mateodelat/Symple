import Image from "next/image";
import Link from "next/link";

import { type PopupProps } from "@/types";
import styles from "./Popup.module.scss";
import { ID_TO_REPLACE } from "@/constants/General";

export default function Popup({
  actions,
  menuItems,
  togglePopup,
  elementId,
}: PopupProps): JSX.Element {
  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popup_content}>
          <ul className={styles.card_list}>
            {menuItems.map(({ id, label, icon, isLink, navigate }) => (
              <li key={label} className={styles.card_list_element}>
                {isLink && navigate !== undefined ? (
                  <Link
                    className={styles.card_list_element_wrapper}
                    href={navigate.replace(ID_TO_REPLACE, elementId)}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {icon !== undefined && (
                      <Image src={icon} alt={label} width={30} height={30} />
                    )}
                    <strong>{label}</strong>
                  </Link>
                ) : (
                  <button
                    className={`${styles.card_list_element_wrapper} ${styles.card_list_element_wrapper_button}`}
                    type="button"
                    onClick={() => {
                      actions?.[id]?.(elementId);
                      togglePopup();
                    }}
                  >
                    {icon !== undefined && (
                      <Image src={icon} alt={label} width={30} height={30} />
                    )}
                    <span>
                      <strong>{label}</strong>
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className={styles.button}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          togglePopup();
        }}
      ></button>
    </>
  );
}
