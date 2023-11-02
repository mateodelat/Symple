"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Card from "@components/shared/Card";
import { type CardEnterpriseProps } from "@/types";
import styles from "./CardEnterprise.module.scss";
import { customFetch } from "@/lib/fetch";

export default function CardEnterprise({
  element,
  onClick = () => {},
  children,
}: CardEnterpriseProps): JSX.Element {
  const { status } = useSession();

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (
      element.image !== undefined &&
      element.image !== "" &&
      status === "authenticated"
    ) {
      customFetch({
        baseUrl: `${process.env.SERVER_URL as string}/uploads/${element.image}`,
        method: "GET",
        hasParser: true,
      })
        .then(async (res) => {
          const blob = await res.blob();
          const src = URL.createObjectURL(blob);
          setImage(src);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [status]);

  const { admins } = element;

  return (
    <Card onClick={onClick}>
      <Image
        src={image !== "" ? image : "/placeholder.svg"}
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
