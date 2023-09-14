"use client";

import { usePathname, useRouter } from "next/navigation";

import { type DepartmentFormData } from "@/types";
import { Form } from "@components/index";
import { sections, schema } from "@constants/DepartmentForm";
import toast from "react-hot-toast";
import departmentsService from "@/services/departments";
import { useDepartmentContext } from "@/contexts";

export default function DepartmentForm(): JSX.Element {
  const { back } = useRouter();
  const pathname = usePathname();

  const { addDepartment } = useDepartmentContext();
  const id = pathname.split("/")[3];
  const handleSubmit = async (data: DepartmentFormData): Promise<void> => {
    await toast.promise(
      departmentsService.create({ enterprise: id, name: data.name }),
      {
        loading: "Creando departamento...",
        error: (err: any) =>
          `Ocurrió un error al crear el departamento: ${err.message as string}`,
        success: (response) => {
          addDepartment(response);
          return `Departamento ${response.name} creado con éxito.`;
        },
      },
    );
    setTimeout(() => {
      back();
    }, 300);
  };

  return <Form sections={sections} schema={schema} onSubmit={handleSubmit} />;
}
