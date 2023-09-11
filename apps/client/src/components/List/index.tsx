"use client";

import { useSession } from "next-auth/react";

import { LinkButton } from "@components/index";
import { type ListProps } from "@/types";
import styles from "./List.module.scss";

export default function List({
  list,
  canCreateElement,
  newElement,
  newElementPage,
  listEmptyMessage,
  Card,
  className = "",
}: ListProps): JSX.Element {
  const { data: session } = useSession();

  return (
    <section className={`${styles.list} ${className}`}>
      {canCreateElement && session?.user.role === "admin" && (
        <LinkButton
          className={styles.list_button}
          href={newElementPage ?? ""}
          label={newElement ?? ""}
        />
      )}
      {list.length > 0 ? (
        list.map((element) => <Card key={element.id} element={element} />)
      ) : (
        <h2>{listEmptyMessage}</h2>
      )}
    </section>
  );
}
