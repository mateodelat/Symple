"use client";

import { useEffect } from "react";
import Image from "next/image";

import styles from "./SearchBar.module.scss";
import { type SearchBarProps } from "@/types";

export default function SearchBar({
  title,
  handleData,
  filter,
  setFilter,
}: SearchBarProps): JSX.Element {
  useEffect(() => {
    const setFiltered = setTimeout(() => {
      handleData(filter);
    }, 150);
    return () => {
      clearTimeout(setFiltered);
    };
  }, [filter]);

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
            setFilter(e.target.value);
          }}
        />
      </div>
    </article>
  );
}
