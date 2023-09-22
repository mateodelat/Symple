"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { type CreateDepartmentDTO, type AppState } from "@/types";
import { AddDepartment, Form } from "@components/index";
import { sections, schema } from "@constants/DepartmentForm";
import toast from "react-hot-toast";
import departmentsService from "@/services/departments";
import { useDepartmentContext } from "@/contexts";
import styles from "./DepartmentForm.module.scss";

export default function DepartmentForm(): JSX.Element {
  const { back } = useRouter();
  const pathname = usePathname();

  const { addDepartment } = useDepartmentContext();
  const enterprise = pathname.split("/")[3];
  const [department, setDepartment] = useState<AppState["department"]>({
    name: "",
    subDepartments: [],
  });

  const [customFields, setCustomFields] = useState({
    department: () => (
      <AddDepartment
        department={department}
        handleDepartmentChange={setDepartment}
      />
    ),
  });

  useEffect(() => {
    setCustomFields({
      department: () => (
        <AddDepartment
          department={department}
          handleDepartmentChange={setDepartment}
        />
      ),
    });
  }, [department]);

  const handleSubmit = async (): Promise<void> => {
    let isSuccess = false;
    try {
      const payload = structuredClone(department);
      if (payload !== null) {
        if (payload.subDepartments === undefined) payload.subDepartments = [];
        if (payload?.subDepartments !== undefined)
          for (const subDepartment of payload.subDepartments) {
            if (subDepartment.name === "") {
              toast.error(
                "El nombre del subdepartamento no puede estar vacío.",
              );
              return;
            }
            if (subDepartment.subDepartments !== undefined)
              for (const lastSubDepartment of subDepartment.subDepartments) {
                if (lastSubDepartment.name === "") {
                  toast.error(
                    "El nombre del subdepartamento no puede estar vacío.",
                  );
                  return;
                }
              }
          }
        const { ...rest } = payload;

        const cleanPayload: CreateDepartmentDTO = {
          name: rest.name,
          enterprise,
          subDepartments: rest.subDepartments.map((subDepartment) => ({
            name: subDepartment.name,
            subDepartments: subDepartment.subDepartments.map((last) => ({
              name: last.name,
              subDepartments: [],
            })),
          })),
        };

        await toast.promise(departmentsService.create(cleanPayload), {
          loading: "Creando departamento...",
          error: (err: any) => err.message,
          success: (response) => {
            addDepartment(response);
            isSuccess = true;
            return `Departamento ${response.name} creado con éxito.`;
          },
        });
      }
    } catch {}

    if (isSuccess)
      setTimeout(() => {
        back();
      }, 300);
  };

  return (
    <Form
      sections={sections}
      schema={schema}
      onSubmit={handleSubmit}
      customFields={customFields}
      fieldsClassName={styles.fields}
    />
  );
}
