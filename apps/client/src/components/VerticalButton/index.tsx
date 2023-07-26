"use client";

import { useState } from "react";

import { Popup } from "@components/index";
import styles from "./VerticalButton.module.scss";

export default function VerticalButton(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.button}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className={styles.button_vertical} />
      </button>
      {isOpen && <Popup />}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      ></button>
    </>
  );
}
