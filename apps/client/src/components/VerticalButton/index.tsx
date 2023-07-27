"use client";

import { type VerticalButtonProps } from "@/types";
import styles from "./VerticalButton.module.scss";

export default function VerticalButton({
  onClick,
  className = "",
}: VerticalButtonProps): JSX.Element {
  return (
    <>
      <button className={`${styles.button} ${className}`} onClick={onClick}>
        <div className={styles.button_vertical} />
      </button>
    </>
  );
}
