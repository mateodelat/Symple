import Image from "next/image";

import styles from "./SearchBar.module.scss";
import { type SearchBarProps } from "@/types";

export default function SearchBar({ title }: SearchBarProps): JSX.Element {
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
        <input type="text" className={styles.searchbar_wrapper_input}></input>
      </div>
    </article>
  );
}
