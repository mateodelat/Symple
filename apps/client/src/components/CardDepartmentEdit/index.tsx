import { type CardDepartmentEditProps } from "@/types";
import { CardDepartment } from "@components/index";

export default function CardDepartmentEdit({
  element,
  onClick,
}: CardDepartmentEditProps): JSX.Element {
  return <CardDepartment element={element} isEditing />;
}
