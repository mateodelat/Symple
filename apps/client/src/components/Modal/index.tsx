"use client";

import { useRef, useEffect } from "react";
import { Button } from "@components/index";

import styles from "./Modal.module.scss";
import { type ModalProps } from "@/types";

export default function Modal({
  isOpen,
  toggle,
  onConfirm,
  children,
}: ModalProps): JSX.Element {
  useEffect(() => {
    if (isOpen) ref.current?.showModal();
  }, [isOpen]);

  const ref = useRef<HTMLDialogElement>(null);

  const handleClick = (): void => {
    ref.current?.classList.add(styles.modal_close);
    setTimeout(() => {
      toggle();
      ref.current?.close();
    }, 150);
  };
  return (
    <>
      <dialog ref={ref} className={styles.modal}>
        {children}
        <div className={styles.modal_wrapper}>
          <Button onClick={onConfirm}>Confirmar</Button>
          <Button onClick={handleClick}>Cancelar</Button>
        </div>
      </dialog>
    </>
  );
}
