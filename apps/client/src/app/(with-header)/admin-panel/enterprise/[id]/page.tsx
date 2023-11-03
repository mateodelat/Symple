'use client'
import { notFound } from 'next/navigation'

import { useDepartmentContext, useEnterpriseContext } from '@contexts/index'
import Loader from '@components/shared/Loader'
import DepartmentList from '@components/modules/Department/DepartmentList'
import { useEffect, useState } from 'react'
import { type Department, type Enterprise } from '@/types'
import styles from './EnterprisePage.module.scss'

export default function EnterprisePage ({
  params
}: {
  params: { id: string }
}): JSX.Element {
  const {
    departments,
    isLoading: departmentsAreLoading,
    updateDepartment,
    deleteDepartment
  } = useDepartmentContext()
  const { enterprises, isLoading } = useEnterpriseContext()

  const [enterprise, setEnterprise] = useState<Enterprise | undefined>()
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    []
  )

  useEffect(() => {
    if (!isLoading) {
      const enterpriseFound = enterprises.find((e) => e.id === params.id)
      if (enterpriseFound !== undefined) setEnterprise(enterpriseFound)
      else notFound()
    }
    if (!departmentsAreLoading) {
      const filtered = departments.filter((d) => d.enterprise === params.id)
      setFilteredDepartments(filtered)
    }
  }, [isLoading, departmentsAreLoading, departments])

  return enterprise !== undefined ? (
    <DepartmentList
      departments={filteredDepartments}
      enterpriseId={params.id}
      title={`Departamentos de ${enterprise.name}`}
      updateDepartment={updateDepartment}
      deleteDepartment={deleteDepartment}
    />
  ) : (
    <div className={styles.container}>
      <Loader className={styles.container_loader} />
    </div>
  )
}
