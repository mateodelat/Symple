"use client";

import { Cards } from "./Cards/";
import { useToggle } from "@hooks/index";
import { CardType, type CardProps, type Enterprise, type User } from "@/types";
import styles from "./Card.module.scss";
import React from "react";

export default function Card({ element, type }: CardProps): JSX.Element {
  const { value: popup, toggle: togglePopup } = useToggle();
  const { value: modal, toggle: toggleModal } = useToggle();

  return (
    <article className={styles.card}>
      {type === CardType.EnterpriseCard && (
        <Cards.EnterpriseCard
          element={element as Enterprise}
          isPopupOpen={popup}
          togglePopup={togglePopup}
          isModalOpen={modal}
          toggleModal={toggleModal}
        />
      )}
      {type === CardType.UserCard && (
        <Cards.UserCard element={element as User} />
      )}
      {popup && (
        <button
          className={styles.togglePopup}
          type="button"
          onClick={() => {
            togglePopup();
          }}
        />
      )}
    </article>
  );
}
