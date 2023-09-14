"use client";
import { notFound } from "next/navigation";

import { useDepartmentContext, useEnterpriseContext } from "@contexts/index";
import { DepartmentList, Loader } from "@components/index";
import { useEffect, useState } from "react";
import { type Department, type Enterprise } from "@/types";
import styles from "./EnterprisePage.module.scss";

export default function EnterprisePage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const { departments, isLoading: departmentsAreLoading } =
    useDepartmentContext();
  const { enterprises, isLoading } = useEnterpriseContext();

  const [enterprise, setEnterprise] = useState<Enterprise | undefined>();
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    [],
  );

  useEffect(() => {
    if (!isLoading) {
      const enterpriseFound = enterprises.find((e) => e.id === params.id);
      if (enterpriseFound !== undefined) setEnterprise(enterpriseFound);
      else notFound();
    }
    if (!departmentsAreLoading)
      setFilteredDepartments(
        departments.filter((d) => d.enterprise === params.id),
      );
  }, [isLoading, departmentsAreLoading]);

  return enterprise !== undefined ? (
    <DepartmentList
      departments={filteredDepartments}
      enterpriseId={params.id}
    />
  ) : (
    <div className={styles.container}>
      <Loader className={styles.container_loader} />
    </div>
  );
}
