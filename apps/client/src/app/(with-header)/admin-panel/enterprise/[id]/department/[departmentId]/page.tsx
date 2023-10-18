import { type DepartmentPageProps } from "@/types"

export default function DepartmentPage ({params}: DepartmentPageProps): JSX.Element {
  return (
    <div>{params.departmentId}</div>
  )
}