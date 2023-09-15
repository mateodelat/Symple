"use client";

import { CardDraggable } from "@components/index";
import { type CardDepartmentProps } from "@/types";
import styles from "./CardDepartment.module.scss";
import { useEffect, useState } from "react";
import { departmentsService } from "@services/index";
import toast from "react-hot-toast";

export default function CardDepartment({
  element,
  children,
  isEditing = false,
}: CardDepartmentProps): JSX.Element {
  const [department, setDepartment] = useState(structuredClone(element));
  console.log(department);

  useEffect(() => {
    const updateDepartment = async (): Promise<void> => {
      if (!isEditing) {
        const initialValues = JSON.stringify(element);
        const finalValues = JSON.stringify(department);

        if (initialValues !== finalValues) {
          const newDepartment = structuredClone(department);
          try {
            delete newDepartment.createdAt;
            delete newDepartment.enterprise;

            await toast.promise(
              departmentsService.update(
                department,
                element.enterprise as string,
              ),
              {
                loading: "Actualizando...",
                error: (err: any) => err.message,
                success: "Departamento actualizado",
              },
            );
          } catch {}
        }
      }
    };
    void updateDepartment();
  }, [isEditing]);

  return (
    <CardDraggable>
      <div className={styles.department}>
        {!isEditing ? (
          <>
            <span>{element.name}</span>
            {element?.subDepartments !== undefined &&
              element.subDepartments.map((sub, i) => (
                <div className={styles.department_sub} key={`sub.name-${i}`}>
                  <span>{sub.name}</span>
                  {sub?.subDepartments !== undefined &&
                    sub.subDepartments.map((lastSub, j) => (
                      <div
                        key={`${lastSub.name ?? ""}-${j}`}
                        className={styles.department_sub_last}
                      >
                        <span>{lastSub.name}</span>
                      </div>
                    ))}
                </div>
              ))}
          </>
        ) : (
          <>
            <input
              value={department.name}
              onChange={(e) => {
                setDepartment((prev) => {
                  const newDepartment = { ...prev };
                  newDepartment.name = e.target.value;
                  return newDepartment;
                });
              }}
            />
            {department?.subDepartments !== undefined &&
              department.subDepartments.map((sub, i) => (
                <div
                  className={styles.department_sub}
                  key={`subName-edit-${i}`}
                >
                  <input
                    value={sub.name}
                    onChange={(e) => {
                      setDepartment((prev) => {
                        const newDepartment = { ...prev };
                        if (newDepartment.subDepartments !== undefined)
                          newDepartment.subDepartments[i].name = e.target.value;
                        return newDepartment;
                      });
                    }}
                  />
                  {sub?.subDepartments !== undefined &&
                    sub.subDepartments.map((lastSub, j) => (
                      <div
                        className={styles.department_sub_last}
                        key={`lastSub-edit-${j}`}
                      >
                        <input
                          value={lastSub.name}
                          onChange={(e) => {
                            setDepartment((prev: any) => {
                              const newDepartment = { ...prev };
                              if (
                                newDepartment.subDepartments?.[i]
                                  ?.subDepartments?.[j] !== undefined
                              )
                                newDepartment.subDepartments[i].subDepartments[
                                  j
                                ] = {
                                  name: e.target.value,
                                };
                              return newDepartment;
                            });
                          }}
                        />
                      </div>
                    ))}
                </div>
              ))}
          </>
        )}

        {children}
      </div>
    </CardDraggable>
  );
}
