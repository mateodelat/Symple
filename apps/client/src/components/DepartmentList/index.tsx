"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Button, CardDepartment, List } from "@components/index";
import { type DepartmentListProps } from "@/types";
import styles from "./DepartmentList.module.scss";

export default function DepartmentList({
  departments,
  enterpriseId,
}: DepartmentListProps): JSX.Element {
  const { data: session, status } = useSession();

  const [canCreate, setCanCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cancelChanges, setCancelChanges] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);

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
      {canCreate && departments.length > 0 && (
        <>
          <Button
            onClick={() => {
              if (!isEditing) setIsEditing((prev) => !prev);
              else setSaveChanges(true);
            }}
            className={styles.container_button}
          >
            {isEditing ? "Guardar" : "Editar"} estructura
          </Button>

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
        </>
      )}
      <List
        list={departments}
        newElement="Crear departamento"
        newElementPage={`/admin-panel/enterprise/${enterpriseId}/create-department`}
        listEmptyMessage="No existen departamentos en esta empresa..."
        canCreateElement={canCreate && !isEditing}
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
