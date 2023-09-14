"use client";
import { notFound } from "next/navigation";

import { useEnterpriseContext } from "@contexts/Enterprise/context";
import { DepartmentList, Loader } from "@components/index";
import { useEffect, useState } from "react";
import { type Enterprise } from "@/types";
import styles from "./EnterprisePage.module.scss";

export default function EnterprisePage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const { enterprises, isLoading } = useEnterpriseContext();
  const [enterprise, setEnterprise] = useState<Enterprise | undefined>();

  useEffect(() => {
    if (!isLoading) {
      const enterpriseFound = enterprises.find((e) => e.id === params.id);
      if (enterpriseFound !== undefined) setEnterprise(enterpriseFound);
      else notFound();
    }
  });
  return enterprise !== undefined ? (
    <DepartmentList enterprise={enterprise} />
  ) : (
    <div className={styles.container}>
      <Loader className={styles.container_loader} />
    </div>
  );
}
