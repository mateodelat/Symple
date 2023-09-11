import Image from "next/image";

import { Card } from "@components/index";
import { type CardEnterpriseProps } from "@/types";
import styles from "./CardEnteprise.module.scss";

export default function CardEnterprise({
  element,
  onClick = () => {},
  children,
}: CardEnterpriseProps): JSX.Element {
  const admins = element.admins.filter((admin) => admin.role !== "admin");
  return (
    <Card onClick={onClick}>
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
        <h2 className={styles.card_text_title} title={element.name}>
          {element.name}
        </h2>
        <p className={styles.card_text_user}>
          {admins.length > 0 &&
            admins.map((admin, i) => {
              if (i === 0) return `@${admin.name}`;
              else if (i === 1) return ",...";
              return "";
            })}
        </p>
      </div>
      {children}
    </Card>
  );
}
