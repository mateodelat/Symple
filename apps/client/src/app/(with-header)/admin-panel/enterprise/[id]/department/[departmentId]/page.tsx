import { DepartmentAdministration } from "@/components";
import { type DepartmentPageProps } from "@/types";

export default function DepartmentPage({
  params,
}: DepartmentPageProps): JSX.Element {
  return <DepartmentAdministration id={params.departmentId} />;
}
