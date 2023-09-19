"use client";

import { useRouter } from "next/navigation";

import styles from "./BackButton.module.scss";

export default function BackButton(): JSX.Element {
  const { back } = useRouter();
  return (
    <button className={styles.back} onClick={back} type="button">
      {"<-"}
    </button>
  );
}
