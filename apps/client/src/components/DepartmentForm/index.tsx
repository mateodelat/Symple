"use client";

import { usePathname } from "next/navigation";

import { type DepartmentFormData } from "@/types";
import { Form } from "@components/index";
import { sections, schema } from "@constants/DepartmentForm";
import toast from "react-hot-toast";
import departmentsService from "@/services/departments";

export default function DepartmentForm(): JSX.Element {
  const pathname = usePathname();

  const id = pathname.split("/")[3];
  const handleSubmit = async (data: DepartmentFormData): Promise<void> => {
    try {
      await departmentsService.create({ enterprise: id, name: data.name });
      toast.success(`Departamento ${data.name} creado con éxito`);
    } catch (err: any) {
      toast.error(
        `Ocurrió un error al crear el departamento: ${err.message as string}`,
      );
    }
  };

  return <Form sections={sections} schema={schema} onSubmit={handleSubmit} />;
}
