"use client";

import { EnterpriseForm } from "@components/index";
import { useEnterpriseContext } from "@contexts/index";

export default function EnterpriseEditPage({ params }: any): JSX.Element {
  const { enterprises } = useEnterpriseContext();
  const enterpriseToEdit = enterprises.find(
    (enterprise) => enterprise.id === params.id,
  );
  return <EnterpriseForm enterpriseToEdit={enterpriseToEdit} />;
}
