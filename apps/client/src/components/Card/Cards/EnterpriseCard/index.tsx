import Image from "next/image";

import { VerticalButton } from "@components/index";
import { type Enterprise } from "@/types";
import styles from "./EnterpriseCard.module.scss";

export default function EnterpriseCard({
  element,
  isPopupOpen,
  togglePopup,
}: {
  element: Enterprise;
  isPopupOpen: boolean;
  togglePopup: () => void;
}): JSX.Element {
  console.log(isPopupOpen);
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
        <h2>{element.name}</h2>
        <p>
          {admins.length > 0 &&
            admins.map((admin, i) => {
              if (i === 0) return `@${admin.name}`;
              else if (i === 1) return ",...";
              return "";
            })}
        </p>
      </div>
      <div className={styles.card_buttons}>
        <Image
          src={"/toggle_button.svg"}
          width={30}
          height={30}
          alt={`Apagar empresa ${element.name}`}
        />
        <VerticalButton
          onClick={() => {
            togglePopup();
          }}
          className={isPopupOpen ? styles.card_buttons_vertical : ""}
        />
      </div>
    </>
  );
}
