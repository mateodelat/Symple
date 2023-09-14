"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { LinkButton } from "@components/index";
import { type ListProps } from "@/types";
import styles from "./List.module.scss";
import { useEffect } from "react";

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
  const { prefetch } = useRouter();

  useEffect(() => {
    if (newElementPage !== undefined) prefetch(newElementPage);
  }, []);
  return (
    <section className={styles.list}>
      {canCreateElement &&
        session?.user.role === "admin" &&
        newElementPage !== undefined &&
        newElement !== undefined && (
          <LinkButton
            className={styles.list_button}
            href={newElementPage}
            label={newElement}
          />
        )}
      {list.length > 0 ? (
        <>
          <div className={`${styles.list_wrapper} ${className}`}>
            {list.map((element) => (
              <Card key={element.id} element={element} />
            ))}
          </div>
        </>
      ) : (
        <h2>{listEmptyMessage}</h2>
      )}
    </section>
  );
}
