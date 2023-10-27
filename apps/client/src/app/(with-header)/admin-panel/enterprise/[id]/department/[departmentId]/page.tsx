import DepartmentAdministration from '@components/modules/Department/DepartmentAdministration'
import { type DepartmentPageProps } from '@/types'

export default function DepartmentPage ({
  params
}: DepartmentPageProps): JSX.Element {
  return <DepartmentAdministration id={params.departmentId} />
}
