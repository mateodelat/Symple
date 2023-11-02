"use client";

import { Card, VerticalButton } from "@components/shared/";
import { type CardEditProps } from "@/types";
import styles from "./CardEdit.module.scss";

export default function CardEdit({
  children,
  menuItems,
  onClick,
  cardClassName = "",
  actions,
  elementId,
}: CardEditProps): JSX.Element {
  return (
    <Card className={`${styles.card} ${cardClassName}`} onClick={onClick}>
      {children}
      <VerticalButton
        actions={actions}
        menuItems={menuItems}
        elementId={elementId}
      />
    </Card>
  );
}
