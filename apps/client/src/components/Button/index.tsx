"use client";

import { type ButtonProps } from "@/types";
import styles from "./Button.module.scss";

export default function Button({
  className = "",
  onClick,
  children,
}: ButtonProps): JSX.Element {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
