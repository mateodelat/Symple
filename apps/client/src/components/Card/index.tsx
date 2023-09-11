"use client";

// import { useToggle } from "@hooks/index";
import { type CardProps } from "@/types";
import styles from "./Card.module.scss";
import React from "react";

export default function Card({
  className = "",
  onClick = () => {},
  children,
}: CardProps): JSX.Element {
  return (
    <article className={`${styles.card} ${className}`} onClick={onClick}>
      {children}
    </article>
  );
}
