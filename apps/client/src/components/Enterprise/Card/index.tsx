import Image from "next/image";

import Button from "../Button";
import { type Enterprise } from "@/types";
import styles from "./Card.module.scss"

export default function EnterpriseCard({
  enterprise,
}: {
  enterprise: Enterprise;
}): JSX.Element {
  const admins = enterprise.admins.filter(admin => admin.role !== 'admin')
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
        <p>{(admins.length > 0) && admins.map((admin, i) => {
          if(i === 0) return `@${admin.name}`
          else if (i === 1) return ",..."
          return ""
          })}</p>
      </div>
      <div className={styles.card_buttons}>
        <Image
          src={'/toggle_button.svg'}
          width={30}
          height={30}
          alt={`Apagar empresa ${enterprise.name}`}
        />
        <Button alt={enterprise.name} />
      </div>
    </article>
  );
}
