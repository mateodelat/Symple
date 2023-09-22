"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AddDepartment, CardDraggable, Modal } from "@components/index";
import { useToggle } from "@hooks/index";
import { type CardDepartmentEditProps } from "@/types";
import styles from "./CardDepartmentEdit.module.scss";

export default function CardDepartmentEdit({
  element,
  deleteDepartment,
  updateDepartment,
}: CardDepartmentEditProps): JSX.Element {
  const { toggle, value } = useToggle();

  const [department, setDepartment] = useState({
    name: element.name,
    subDepartments:
      element.subDepartments?.length > 0
        ? element.subDepartments?.map((subDepartment) => ({
            id: `${element.name}-${subDepartment.name}`,
            name: subDepartment.name,
            subDepartments:
              subDepartment.subDepartments?.length > 0
                ? subDepartment.subDepartments?.map((last) => ({
                    id: `${element.name}-${subDepartment.name}-${last.name}`,
                    name: last.name,
                    subDepartments: [],
                  }))
                : [],
          }))
        : [],
  });

  return (
    <CardDraggable>
      <div className={styles.department}>
        <AddDepartment
          department={{
            name: department.name,
            subDepartments: department.subDepartments?.map((subDepartment) => ({
              id: uuidv4(),
              name: subDepartment.name,
              subDepartments: subDepartment.subDepartments?.map((last) => ({
                id: uuidv4(),
                name: last.name,
                subDepartments: [],
              })),
            })),
          }}
          handleDepartmentChange={setDepartment as any}
          isEditMode
        />
      </div>
      {value && (
        <Modal
          isOpen={value}
          toggle={toggle}
          onConfirm={() => {
            deleteDepartment(element.id);
          }}
        >
          <h3>Atención</h3>
          <p>
            ¿Estás seguro que deseas eliminar este departamento? Se eliminaran
            todos los subdepartamentos dependientes.
          </p>
        </Modal>
      )}
    </CardDraggable>
  );
}
