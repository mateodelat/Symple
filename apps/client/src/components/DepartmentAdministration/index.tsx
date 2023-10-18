"use client";

import { Button, SearchBar } from "@components/index";
import { type DepartmentAdministrationProps } from "@/types";
import styles from "./DepartmentAdministration.module.scss";
import { useState } from "react";
import { internalLinks } from "@/constants/DepartmentAdministration";

export default function DepartmentAdministration({
  id,
}: DepartmentAdministrationProps): JSX.Element {
  const [filter, setFilter] = useState("");
  const [links, setLinks] = useState(internalLinks);

  const handleActive = (name: string): void => {
    setLinks((prev) => {
      const newLinks = structuredClone(prev);
      newLinks.forEach((link) => {
        if (link.name === name) link.isActive = true;
        else link.isActive = false;
      });
      return newLinks;
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.container_nav}>
        <h1>Administración</h1>
        <ul className={styles.container_nav_list}>
          {links.map(({ label, name, isActive }) => (
            <li
              className={`${styles.container_nav_list_item} ${
                isActive ? styles.container_nav_list_item_active : ""
              }`}
            >
              <button
                onClick={() => {
                  handleActive(name);
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <SearchBar filter={filter} handleData={() => {}} setFilter={setFilter} />
      <Button className={styles.container_create}>
        Nuevo {links.find((link) => link.isActive)?.label}
      </Button>
    </section>
  );
}
