"use client";

import { useState } from "react";

import { type AddSubdepartmentProps } from "@/types";
import styles from "./AddSubDepartment.module.scss";

export default function AddSubDepartment({
  department,
  handleDepartmentChange,
  index,
}: AddSubdepartmentProps): JSX.Element {
  const [subDepartmentCount, setSubDepartmentCount] = useState(0);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Sub departamento"
        className={styles.container_input}
        onChange={(e) => {
          handleDepartmentChange((prev) => {
            const newDepartment = { ...prev };
            if (newDepartment.subDepartments === undefined) {
              newDepartment.subDepartments = [];
              newDepartment.subDepartments.push({
                name: e.target.value,
                subDepartments: [],
              });
            } else newDepartment.subDepartments[index].name = e.target.value;
            return newDepartment;
          });
        }}
      />
      <button
        type="button"
        onClick={() => {
          setSubDepartmentCount((prev) => prev + 1);
          handleDepartmentChange((prev) => {
            const newDepartment = { ...prev };
            if (newDepartment.subDepartments?.[index] !== undefined) {
              if (
                newDepartment.subDepartments?.[index].subDepartments ===
                undefined
              ) {
                newDepartment.subDepartments[index].subDepartments = [];
              }

              newDepartment.subDepartments[index].subDepartments?.push({
                name: "",
              });
            }
            return newDepartment;
          });
        }}
        className={styles.container_button}
      >
        +
      </button>
      {Array.from({ length: subDepartmentCount }).map((_, i) => (
        <div key={i} className={styles.container_subdepartment}>
          <input
            type="text"
            placeholder="Sub departamento - "
            onChange={(e) => {
              handleDepartmentChange((prev: any) => {
                const newDepartment = { ...prev };

                if (
                  newDepartment.subDepartments?.[index] !== undefined &&
                  newDepartment.subDepartments?.[index].subDepartments ===
                    undefined
                )
                  newDepartment.subDepartments[index].subDepartments = [];

                if (
                  newDepartment.subDepartments?.[index]?.subDepartments?.[i] !==
                  undefined
                )
                  newDepartment.subDepartments[index].subDepartments[i] = {
                    name: e.target.value,
                  };
                return newDepartment;
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}
