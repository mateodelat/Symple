"use client";

import { useRef, useEffect } from "react";
import { Button } from "@components/index";

import styles from "./Modal.module.scss";
import { type ModalProps } from "@/types";

export default function Modal({
  isOpen,
  toggle,
  onConfirm,
  onCancel = () => {},
  children,
  className = "",
}: ModalProps): JSX.Element {
  useEffect(() => {
    if (isOpen) ref.current?.showModal();
  }, [isOpen]);

  const ref = useRef<HTMLDialogElement>(null);

  const handleConfirm = (): void => {
    handleClick();
    setTimeout(() => {
      onConfirm();
    }, 150);
  };

  const handleCancel = (): void => {
    handleClick();
    onCancel();
  };

  const handleClick = (): void => {
    ref.current?.classList.add(styles.modal_close);
    setTimeout(() => {
      toggle();
      ref.current?.close();
    }, 150);
  };
  return (
    <>
      <dialog ref={ref} className={`${styles.modal} ${className}`}>
        {children}
        <div className={styles.modal_wrapper}>
          <Button onClick={handleConfirm}>Confirmar</Button>
          <Button onClick={handleCancel}>Cancelar</Button>
        </div>
      </dialog>
    </>
  );
}
