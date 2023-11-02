"use client";

import { type EditEnterpriseDTO } from "@/types";
import EnterpriseForm from "@components/modules/Enterprise/EnterpriseForm";
import { useEnterpriseContext } from "@contexts/index";

export default function EnterpriseEditPage({ params }: any): JSX.Element {
  const { enterprises } = useEnterpriseContext();
  const enterpriseToEdit = enterprises.find(
    (enterprise) => enterprise.id === params.id,
  );
  return (
    <EnterpriseForm
      enterpriseToEdit={
        (enterpriseToEdit as unknown as EditEnterpriseDTO) ?? undefined
      }
    />
  );
}
