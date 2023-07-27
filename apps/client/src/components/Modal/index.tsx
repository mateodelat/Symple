"use client";

import { useRef, useEffect } from "react";

import styles from "./Modal.module.scss";

export default function Modal({ toggle }: { toggle: () => void }): JSX.Element {
  useEffect(() => {
    ref.current?.showModal();
  }, []);

  const ref = useRef<HTMLDialogElement>(null);

  const handleClick = (): void => {
    toggle();
    ref.current?.close();
  };
  return (
    <>
      <dialog ref={ref} className={styles.modal}>
        <h1>Modal</h1>
        <p>Modal content</p>
        <button onClick={handleClick}>Close</button>
      </dialog>
    </>
  );
}
