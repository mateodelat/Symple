"use client";

import { Card, LinkButton } from "@components/index";
import { type ListProps } from "@/types";
import styles from "./List.module.scss";

export default function List({
  list,
  canCreateElement,
  newElement,
  newElementPage,
  listEmptyMessage,
  typeOfCard,
  className = "",
  cardClassName = "",
  cardOnClick = () => {},
}: ListProps): JSX.Element {
  return (
    <section className={`${styles.list} ${className}`}>
      {canCreateElement && (
        <LinkButton
          className={styles.list_button}
          href={newElementPage ?? ""}
          label={newElement ?? ""}
        />
      )}
      {list.length > 0 ? (
        list.map((element) => (
          <Card
            element={element}
            key={element.id}
            type={typeOfCard}
            className={cardClassName}
            onClick={() => {
              cardOnClick(element);
            }}
          />
        ))
      ) : (
        <h2>{listEmptyMessage}</h2>
      )}
    </section>
  );
}
