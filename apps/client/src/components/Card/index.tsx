"use client";

import { EnterpriseComponents } from "@components/index";
import { Cards } from "./Cards/";
import { useToggle } from "@hooks/index";
import { type Enterprise, type User, type CardType } from "@/types";
import styles from "./Card.module.scss";

export default function Card({
  element,
  type,
}: {
  element: Enterprise | User;
  type: CardType;
}): JSX.Element {
  const { Popup } = EnterpriseComponents;
  const { value, toggle } = useToggle();
  // const CardComponent = Cards[type];

  return (
    <article className={styles.card}>
      {/* 
      Todo: Fix the type for this CardComponent to allow dynamic usage of card components
        <CardComponent
        element={element}
        isPopupOpen={value}
        togglePopup={toggle}
      /> */}

      {value && (
        <>
          <Popup id={element.id} />
          <button
            className={styles.togglePopup}
            type="button"
            onClick={() => {
              toggle();
            }}
          />
        </>
      )}
    </article>
  );
}
