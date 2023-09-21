"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import { Button, ButtonIcon, CardDepartment, List } from "@components/index";
import { type DepartmentListProps } from "@/types";
import styles from "./DepartmentList.module.scss";

export default function DepartmentList({
  departments,
  enterpriseId,
  title
}: DepartmentListProps): JSX.Element {
  const { data: session, status } = useSession();

  const [canCreate, setCanCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cancelChanges, setCancelChanges] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

useEffect(() => {
  window.addEventListener('resize', handleWindowResize);
  return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    if (status === "authenticated") {
      setCanCreate(
        session?.user.role === "admin" ||
          session.user.enterprises?.findIndex((e) => e === enterpriseId) !== -1,
      );
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <List
        list={departments}
        newElement="Crear departamento"
        newElementPage={`/admin-panel/enterprise/${enterpriseId}/create-department`}
        listEmptyMessage="No existen departamentos en esta empresa..."
        canCreateElement={canCreate && !isEditing}
        beforeListContent={() => (
          canCreate && departments.length > 0 && windowSize < 1024? (
            <>
              {isEditing && (
                <>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setCancelChanges(true);
                    }}
                    className={styles.container_button}
                  >
                    Cancelar cambios
                  </Button>
                </>
              )}
              <Button
                onClick={() => {
                  if (!isEditing) setIsEditing((prev) => !prev);
                  else setSaveChanges(true);
                }}
                className={styles.container_button}
              >
                {isEditing ? "Guardar" : "Editar"} estructura
              </Button>
              <h3>{title}</h3>
            </>
            ) : (
              <div className={styles.desktop_wrapper}>
                <h3>{title}</h3>
                <ButtonIcon icon={"/pencil.svg"} onClick={() => {
                  if (!isEditing) setIsEditing((prev) => !prev);
                }}/>
              </div>
            )
          ) 
        }
        Card={CardDepartment}
        cardProps={{
          isEditing,
          setIsEditing,
          cancelChanges,
          setCancelChanges,
          saveChanges,
          setSaveChanges,
        }}
      />
    </div>
  );
}
