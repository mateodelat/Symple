"use client";

import { useRef } from "react";
import { VerticalButton } from "@components/index";

import styles from "./Modal.module.scss";

export default function Modal(): JSX.Element {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <dialog ref={ref} className={styles.modal}>
        <h1>Modal</h1>
        <p>Modal content</p>
        <button onClick={() => ref.current?.close()}>Close</button>
      </dialog>
      <VerticalButton />
    </>
  );
}
