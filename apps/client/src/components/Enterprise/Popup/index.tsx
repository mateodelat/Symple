import Link from "next/link";

import { Button, Modal } from "@components/index";
import { useToggle } from "@hooks/index";
import styles from "./Popup.module.scss";

export default function Popup({ id }: { id: string }): JSX.Element {
  const { value: isModalOpen, toggle } = useToggle();

  const handleIsModalOpen = (value: boolean): void => {
    toggle(value);
  };
  return (
    <>
      <div className={styles.popup}>
        <h3>Opciones</h3>
        <div className={styles.popup_content}>
          <Link
            className={styles.popup_content_action}
            href={`/admin-panel/enterprise/${id}/edit`}
          >
            Editar
          </Link>
          <Button
            className={styles.popup_content_action}
            onClick={(): void => {
              handleIsModalOpen(true);
            }}
          >
            Eliminar
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          toggle={() => {
            handleIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
