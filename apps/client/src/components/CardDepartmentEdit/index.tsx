"use client";

import { ButtonIcon, CardDraggable, Modal } from "@components/index";
import { useToggle } from "@hooks/index";
import { type CardDepartmentEditProps } from "@/types";
import styles from "./CardDepartmentEdit.module.scss";

export default function CardDepartmentEdit({
  element,
  deleteDepartment,
  updateDepartment,
}: CardDepartmentEditProps): JSX.Element {
  const { toggle, value } = useToggle();

  return (
    <CardDraggable>
      <div className={styles.department}>
        <div className={styles.department_wrapper}>
          <input
            value={element.name}
            onChange={(e) => {
              const newElement = structuredClone(element);
              newElement.name = e.target.value;
              updateDepartment(element.id, newElement);
            }}
          />
          <ButtonIcon
            icon={"/trash_bin.svg"}
            onClick={toggle}
            className={styles.department_wrapper_button}
          />
        </div>
        {element?.subDepartments !== undefined &&
          element.subDepartments.map((sub, i) => (
            <div className={styles.department_sub} key={`subName-edit-${i}`}>
              <div className={styles.department_wrapper}>
                <input
                  value={sub.name}
                  onChange={(e) => {
                    const newElement = structuredClone(element);
                    if (newElement.subDepartments !== undefined)
                      newElement.subDepartments[i].name = e.target.value;
                    updateDepartment(element.id, newElement);
                  }}
                />
                <ButtonIcon
                  icon={"/trash_bin.svg"}
                  onClick={() => {
                    const newElement = structuredClone(element);
                    newElement.subDepartments =
                      newElement.subDepartments?.filter(
                        (s) => s.name !== sub.name,
                      );
                    updateDepartment(element.id, newElement);
                  }}
                  className={styles.department_wrapper_button}
                />
              </div>

              {sub?.subDepartments !== undefined &&
                sub.subDepartments.map((lastSub, j) => (
                  <div
                    className={styles.department_sub_last}
                    key={`lastSub-edit-${j}`}
                  >
                    <div className={styles.department_wrapper}>
                      <input
                        value={lastSub.name}
                        onChange={(e) => {
                          const newElement = structuredClone(element);

                          newElement.subDepartments[i].subDepartments[j] = {
                            name: e.target.value,
                            subDepartments: [],
                          };
                          updateDepartment(element.id, newElement);
                        }}
                      />
                      <ButtonIcon
                        icon={"/trash_bin.svg"}
                        onClick={() => {
                          const newElement = structuredClone(element);
                          if (newElement.subDepartments !== undefined)
                            newElement.subDepartments[i].subDepartments =
                              newElement.subDepartments[
                                i
                              ].subDepartments?.filter(
                                (ls) => ls.name !== lastSub.name,
                              );
                          updateDepartment(element.id, newElement);
                        }}
                        className={styles.department_wrapper_button}
                      />
                    </div>
                  </div>
                ))}
            </div>
          ))}
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
