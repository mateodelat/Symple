import React from "react";

import { Header } from "@components/index";
import styles from "@styles/WithHeader.module.scss";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <main className={styles.main}>
      <Header />
      {children}
    </main>
  );
}
