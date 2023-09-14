"use client";

// import { useSession } from "next-auth/react";

import { CardDepartment, List } from "@components/index";
import { type DepartmentListProps } from "@/types";

export default function DepartmentList({
  enterprise,
}: DepartmentListProps): JSX.Element {
  // const { data: session, status } = useSession();

  return (
    <List
      list={enterprise.departments}
      newElement="Crear departamento"
      newElementPage={`/admin-panel/enterprise/${enterprise.id}/create-department`}
      listEmptyMessage="No existen departamentos en esta empresa..."
      canCreateElement={true}
      Card={CardDepartment}
    />
  );
}
