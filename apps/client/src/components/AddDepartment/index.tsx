"use client";

import { useState } from "react";
import styles from "./AddDepartment.module.scss";

import { AddSubDepartment, Button } from "@components/index";
import { type AddDepartmentProps } from "@/types";

export default function AddDepartment({
  department,
  handleDepartmentChange,
}: AddDepartmentProps): JSX.Element {
  const [subDepartmentCount, setSubDepartmentCount] = useState(0);

  const isDisabled =
    (department?.subDepartments instanceof Array &&
      department?.subDepartments?.at(-1)?.name === "") ||
    department?.name === undefined ||
    department?.name === "";

  return (
    <div className={styles.container}>
      <span className={styles.container_title}>{department?.name}</span>
      <input
        type="text"
        placeholder="Departamento"
        onChange={(e) => {
          handleDepartmentChange((prev) => {
            const newDepartment = { ...prev };

            newDepartment.name = e.target.value;
            return newDepartment;
          });
        }}
      />

      {Array.from({ length: subDepartmentCount }).map((_, i) => (
        <AddSubDepartment
          key={i}
          index={i}
          department={department}
          handleDepartmentChange={handleDepartmentChange}
        />
      ))}
      <Button
        onClick={() => {
          handleDepartmentChange((prev) => {
            const newDepartment = { ...prev };
            if (newDepartment.subDepartments === undefined) {
              newDepartment.subDepartments = [];
            }
            newDepartment.subDepartments.push({ name: "" });

            return newDepartment;
          });
          setSubDepartmentCount((prev) => prev + 1);
        }}
        props={{
          disabled: isDisabled,
        }}
      >
        Agregar sub departamento
      </Button>
    </div>
  );
}
