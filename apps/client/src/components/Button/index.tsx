"use client";

import { type ButtonProps } from "@/types";
import styles from "./Button.module.scss";

export default function Button({
  className = "",
  onClick,
  children,
  type = "button",
  props = {},
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
