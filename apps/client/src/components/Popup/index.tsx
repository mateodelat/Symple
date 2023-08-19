import Link from "next/link";

import styles from "./Popup.module.scss";
import { type PopupProps } from "@/types";

export default function Popup({ id, toggleModal }: PopupProps): JSX.Element {
  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popup_content}>
          <Link
            className={styles.popup_content_action}
            href={`/admin-panel/enterprise/${id}/edit`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Editar
          </Link>
        </div>
      </div>
    </>
  );
}
