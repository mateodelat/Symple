import Image from "next/image";

import styles from "./UserCard.module.scss";
import { type CardUser } from "@/types";

export default function UserCard({ element }: CardUser): JSX.Element {
  return (
    <>
      <Image
        src={
          element.avatar === undefined || element.avatar === ""
            ? "/placeholder.svg"
            : element.avatar
        }
        width={100}
        height={100}
        alt={`Foto de usuario ${element.name}`}
        className={styles.card_image}
      />
      <div className={styles.card_text}>
        <h2 className={styles.card_text_title}>{element.name}</h2>
        <p className={styles.card_text_user}>{element.email}</p>
      </div>
    </>
  );
}
