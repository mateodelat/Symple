"use client";

import { ButtonIcon, CardDraggable, Modal } from "@components/index";
import { type CardDepartmentProps } from "@/types";
import styles from "./CardDepartment.module.scss";
import { useEffect, useState } from "react";
import { departmentsService } from "@services/index";
import toast from "react-hot-toast";
import { useToggle } from "@hooks/index";

export default function CardDepartment({
  element,
  children,
  cardProps,
}: CardDepartmentProps): JSX.Element {
  const [department, setDepartment] = useState(structuredClone(element));

  const { toggle, value: toggleDeleteDepartment } = useToggle();

  const deleteDepartment = async (): Promise<void> => {
    console.log(department.id);
  };

  useEffect(() => {
    if (cardProps?.cancelChanges === true) {
      setDepartment(structuredClone(element));
      cardProps?.setCancelChanges(false);
    } else {
      if (JSON.stringify(department) === JSON.stringify(element)) return;
      if (cardProps?.saveChanges === true) {
        const updateDepartment = async (): Promise<void> => {
          try {
            const response = await departmentsService.update(
              department,
              department.id as string,
            );

            console.log(response);
            cardProps?.setSaveChanges(false);
            cardProps?.setIsEditing(false);
          } catch (err: any) {
            toast.error(err.message);
          }
        };
        void updateDepartment();
      }
    }
  }, [cardProps?.cancelChanges, cardProps?.saveChanges]);

  return (
    <CardDraggable>
      <div className={styles.department}>
        {cardProps?.isEditing === false ? (
          <>
            <span>{department.name}</span>
            {department?.subDepartments !== undefined &&
              department.subDepartments.map((sub, i) => (
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
            <div className={styles.department_wrapper}>
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
              <ButtonIcon
                icon={"/trash_bin.svg"}
                onClick={toggle}
                className={styles.department_wrapper_button}
              />
            </div>

            {department?.subDepartments !== undefined &&
              department.subDepartments.map((sub, i) => (
                <div
                  className={styles.department_sub}
                  key={`subName-edit-${i}`}
                >
                  <div className={styles.department_wrapper}>
                    <input
                      value={sub.name}
                      onChange={(e) => {
                        setDepartment((prev) => {
                          const newDepartment = { ...prev };
                          if (newDepartment.subDepartments !== undefined)
                            newDepartment.subDepartments[i].name =
                              e.target.value;
                          return newDepartment;
                        });
                      }}
                    />
                    <ButtonIcon
                      icon={"/trash_bin.svg"}
                      onClick={() => {
                        setDepartment((prev) => {
                          const newDepartment = { ...prev };
                          newDepartment.subDepartments =
                            newDepartment.subDepartments?.filter(
                              (s) => s.name !== sub.name,
                            );
                          return newDepartment;
                        });
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
                              setDepartment((prev: any) => {
                                const newDepartment = { ...prev };
                                if (
                                  newDepartment.subDepartments?.[i]
                                    ?.subDepartments?.[j] !== undefined
                                )
                                  newDepartment.subDepartments[
                                    i
                                  ].subDepartments[j] = {
                                    name: e.target.value,
                                  };
                                return newDepartment;
                              });
                            }}
                          />
                          <ButtonIcon
                            icon={"/trash_bin.svg"}
                            onClick={() => {
                              console.log(lastSub.name);
                              setDepartment((prev) => {
                                const newDepartment = { ...prev };
                                if (newDepartment.subDepartments !== undefined)
                                  newDepartment.subDepartments[
                                    i
                                  ].subDepartments =
                                    newDepartment.subDepartments[
                                      i
                                    ].subDepartments?.filter(
                                      (ls) => ls.name !== lastSub.name,
                                    );

                                return newDepartment;
                              });
                            }}
                            className={styles.department_wrapper_button}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </>
        )}
        {children}
      </div>
      <Modal
        isOpen={toggleDeleteDepartment}
        toggle={toggle}
        onConfirm={deleteDepartment}
      >
        <h3>Atención</h3>
        <p>
          ¿Estás seguro que deseas eliminar este departamento? Se eliminaran
          todos los subdepartamentos dependientes.
        </p>
      </Modal>
    </CardDraggable>
  );
}
