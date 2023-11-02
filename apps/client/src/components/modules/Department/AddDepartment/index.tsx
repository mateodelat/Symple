"use client";

import Button from "@components/shared/Button";
import AddSubDepartment from "@components/modules/Department/AddSubDepartment";
import { type AddDepartmentProps } from "@/types";
import styles from "./AddDepartment.module.scss";
import { v4 as uuidv4 } from "uuid";

export default function AddDepartment({
  department,
  handleDepartmentChange,
  isEditMode = false,
}: AddDepartmentProps): JSX.Element {
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
          handleDepartmentChange((prev: any) => {
            const newDepartment = { ...prev };
            newDepartment.name = e.target.value;
            return newDepartment;
          });
        }}
        value={isEditMode ? department.name : undefined}
      />

      {department.subDepartments.map((sub, i) => (
        <AddSubDepartment
          key={sub.id}
          index={i}
          department={department}
          handleDepartmentChange={handleDepartmentChange}
          isEditMode={isEditMode}
        />
      ))}
      <Button
        onClick={() => {
          handleDepartmentChange((prev) => {
            const newDepartment = { ...prev };
            if (newDepartment.subDepartments === undefined) {
              newDepartment.subDepartments = [];
            }
            newDepartment.subDepartments.push({
              name: "",
              subDepartments: [],
              id: uuidv4(),
            });

            return newDepartment;
          });
        }}
        props={{
          disabled: isDisabled,
        }}
        className={styles.container_button}
      >
        Agregar sub departamento
      </Button>
    </div>
  );
}
