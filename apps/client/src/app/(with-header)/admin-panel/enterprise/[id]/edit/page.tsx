"use client";

import { useSearchParams } from "next/navigation";

import { EnterpriseForm } from "@components/index";

export default function EnterpriseEditPage(): JSX.Element {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(searchParams.entries());
  return <EnterpriseForm isEditMode={true} id={id as string} />;
}
