import { type CardUserEditProps } from "@/types";
import CardUser from "@components/modules/User/CardUser";
import styles from "./CardUserEdit.module.scss";

export default function CardUserEdit({
  element,
  onClick,
  isAdding = false,
}: CardUserEditProps): JSX.Element {
  return (
    <CardUser element={element} onClick={onClick}>
      <div className={isAdding ? styles.add : styles.remove} />
    </CardUser>
  );
}
