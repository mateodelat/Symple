"use client";

import { type VerticalButtonProps } from "@/types";
import styles from "./VerticalButton.module.scss";
import React from "react";

export default function VerticalButton({
  onClick,
  className = "",
}: VerticalButtonProps): JSX.Element {
  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onClick();
  };
  return (
    <>
      <button
        className={`${styles.button} ${className}`}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <div className={styles.button_vertical} />
      </button>
    </>
  );
}
