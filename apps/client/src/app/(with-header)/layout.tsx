import React from "react";

import { BackButton, Header } from "@components/shared/";
import styles from "@styles/WithHeader.module.scss";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <main className={styles.main}>
      <Header />
      <BackButton />
      {children}
    </main>
  );
}
