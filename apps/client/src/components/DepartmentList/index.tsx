"use client";

// import { useSession } from "next-auth/react";
import { CardEnterpriseEdit, List } from "@components/index";
import { type DepartmentListProps } from "@/types";
// import { useEffect } from "react";

export default function DepartmentList({
  enterprise,
}: DepartmentListProps): JSX.Element {
  // const { data: session, status } = useSession();

  return (
    <List
      list={enterprise.departments}
      newElement="Crear departamento"
      newElementPage="/"
      listEmptyMessage="No existen departamentos en esta empresa..."
      canCreateElement={true}
      Card={CardEnterpriseEdit}
    />
  );
}
