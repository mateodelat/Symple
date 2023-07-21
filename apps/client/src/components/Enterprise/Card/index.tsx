import Image from "next/image";

import { type Enterprise } from "@/types";
import styles from "./Card.module.scss"

export default function EnterpriseCard({
  enterprise,
}: {
  enterprise: Enterprise;
}): JSX.Element {
  return (
    <article className={styles.card}>
      <Image
        src={
          enterprise.image === undefined || enterprise.image === ""
            ? "/placeholder.svg"
            : enterprise.image
        }
        width={100}
        height={100}
        alt={`Foto de empresa ${enterprise.name}`}
        className={styles.card_image}
      />
      <div className={styles.card_text}>
        <h2>{enterprise.name}</h2>
      </div>
      <div className={styles.card_buttons}>
        <Image
          src={'/toggle_button.svg'}
          width={30}
          height={30}
          alt={`Foto de empresa ${enterprise.name}`}
        />
        <Image
          src={'/vertical_button.svg'}
          width={30}
          height={30}
          alt={`Foto de empresa ${enterprise.name}`}
        />
      </div>


    </article>
  );
}
