"use client";

import { CardDraggable } from "@components/index";
import { type CardDepartmentProps } from "@/types";
import styles from "./CardDepartment.module.scss";

export default function CardDepartment({
  element,
  onClick = () => {},
}: CardDepartmentProps): JSX.Element {
  return (
    <CardDraggable onClick={onClick}>
      <div className={styles.department}>
        <span
          className={`${styles.department_name} ${
            element.subDepartments.length === 0
              ? styles.department_no_border
              : ""
          }`}
        >
          {element.name}
        </span>
        {element?.subDepartments !== undefined &&
          element.subDepartments.map((sub, i, self) => (
            <div className={styles.department_sub} key={`sub.name-${i}`}>
              <span
                className={`${styles.department_sub_name} ${
                  i === self.length - 1 && sub.subDepartments?.length === 0
                    ? styles.department_no_border
                    : ""
                }`}
              >
                {sub.name}
              </span>
              {sub?.subDepartments !== undefined &&
                sub.subDepartments.map((lastSub, j, lastSelf) => (
                  <div
                    key={`${lastSub.name ?? ""}-${j}`}
                    className={styles.department_sub_last}
                  >
                    <span
                      className={`${styles.department_sub_last_name} ${
                        i === self.length - 1 && j === lastSelf?.length - 1
                          ? styles.department_no_border
                          : ""
                      }`}
                    >
                      {lastSub.name}
                    </span>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </CardDraggable>
  );
}
