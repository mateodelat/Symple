import { useRouter } from "next/navigation";

import {
  CardEnterprise,
  VerticalButton,
  Popup,
  DeleteEnterprise,
} from "@components/index";
import { useToggle } from "@hooks/index";
import { type CardEnterpriseEditProps, type Enterprise } from "@/types";
import styles from "./CardEntepriseEdit.module.scss";

export default function CardEnterpriseEdit({
  element,
}: CardEnterpriseEditProps): JSX.Element {
  const router = useRouter();

  const handleCardClick = (enterprise: Enterprise): void => {
    router.push(`/admin-panel/enterprise/${enterprise.id}`);
  };

  const { value: isPopupOpen, toggle: togglePopup } = useToggle();
  const { value: isModalOpen, toggle: toggleModal } = useToggle();
  return (
    <CardEnterprise
      element={element}
      onClick={() => {
        handleCardClick(element);
      }}
    >
      <VerticalButton onClick={togglePopup} className={styles.vertical} />
      {isPopupOpen && <Popup id={element.id} toggleModal={toggleModal} />}
      {isModalOpen && (
        <DeleteEnterprise
          isOpen={isModalOpen}
          toggle={toggleModal}
          enterpriseId={element.id}
        />
      )}
    </CardEnterprise>
  );
}
