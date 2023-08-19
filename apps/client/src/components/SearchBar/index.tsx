"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./SearchBar.module.scss";
import { type SearchBarProps } from "@/types";

export default function SearchBar({
  title,
  handleData,
}: SearchBarProps): JSX.Element {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search === "") return;
    const setFiltered = setTimeout(() => {
      handleData(search);
    }, 100);
    return () => {
      clearTimeout(setFiltered);
    };
  }, [search]);

  return (
    <article className={styles.searchbar}>
      <legend>{title}</legend>
      <div className={styles.searchbar_wrapper}>
        <Image
          src="/search_logo.svg"
          width={14}
          height={14}
          alt="Search Icon"
          className={styles.searchbar_wrapper_icon}
        />
        <input
          type="text"
          className={styles.searchbar_wrapper_input}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </article>
  );
}
