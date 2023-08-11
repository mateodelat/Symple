import Image from "next/image";

import { VerticalButton, Popup } from "@components/index";
import { type CardEnterprise } from "@/types";
import styles from "./EnterpriseCard.module.scss";
import DeleteEnterprise from "@/components/DeleteEnterprise";

export default function EnterpriseCard({
  element,
  isPopupOpen,
  togglePopup,
  isModalOpen,
  toggleModal,
}: CardEnterprise): JSX.Element {
  const admins = element.admins.filter((admin) => admin.role !== "admin");

  return (
    <>
      <Image
        src={
          element.image === undefined || element.image === ""
            ? "/placeholder.svg"
            : element.image
        }
        width={100}
        height={100}
        alt={`Foto de empresa ${element.name}`}
        className={styles.card_image}
      />
      <div className={styles.card_text}>
        <h2 className={styles.card_text_title}>{element.name}</h2>
        <p className={styles.card_text_user}>
          {admins.length > 0 &&
            admins.map((admin, i) => {
              if (i === 0) return `@${admin.name}`;
              else if (i === 1) return ",...";
              return "";
            })}
        </p>
      </div>
      <VerticalButton
        onClick={togglePopup}
        className={isPopupOpen ? styles.card_vertical : ""}
      />
      {isPopupOpen && <Popup id={element.id} toggleModal={toggleModal} />}
      {isModalOpen && (
        <DeleteEnterprise
          isOpen={isModalOpen}
          toggle={toggleModal}
          enterpriseId={element.id}
        />
      )}
    </>
  );
}
