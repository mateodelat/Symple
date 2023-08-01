import Link from "next/link";
import React from "react";

import styles from "./LinkButton.module.scss";
import { type LinkButtonProps } from "@/types";

export default function LinkButton({
  href,
  label,
  className = "",
}: LinkButtonProps): JSX.Element {
  return (
    <Link href={href} className={`${styles.link} ${className}`}>
      {label}
    </Link>
  );
}
