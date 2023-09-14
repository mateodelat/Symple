import { type CardDepartmentProps } from "@/types";
import { CardDraggable } from "@components/index";

export default function CardDepartment({
  element,
}: CardDepartmentProps): JSX.Element {
  return (
    <CardDraggable>
      <div>
        <span>{element.name}</span>
      </div>
    </CardDraggable>
  );
}
