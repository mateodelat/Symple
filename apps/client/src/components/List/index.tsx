"use client";

import { Card, LinkButton } from "@components/index";
import { type ListProps } from "@/types";
import styles from "./List.module.scss";

export default function List({
  list,
  newElement,
  newElementPage,
  listEmptyMessage,
  typeOfCard,
}: ListProps): JSX.Element {
  return (
    <section className={styles.list}>
      <LinkButton
        className={styles.list_button}
        href={newElementPage}
        label={newElement}
      />
      {list.length > 0 ? (
        list.map((element) => (
          <Card element={element} key={element.id} type={typeOfCard} />
        ))
      ) : (
        <h2>{listEmptyMessage}</h2>
      )}
    </section>
  );
}
