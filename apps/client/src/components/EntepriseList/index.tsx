"use client";

import { useRouter } from "next/navigation";

import { useEnterpriseContext } from "@contexts/Enterprise/context";
import { List } from "@components/index";
import { CardType, type Enterprise } from "@/types";

export default function EnterpriseList(): JSX.Element {
  const router = useRouter();
  const { enterprises, isLoading } = useEnterpriseContext();

  const handleCardClick = (enterprise: Enterprise): void => {
    router.push(`/admin-panel/enterprise/${enterprise.id}`);
  };

  return (
    <>
      {isLoading ? (
        <h2>Cargando empresas...</h2>
      ) : (
        <List
          list={enterprises}
          newElement="Nueva empresa"
          newElementPage={"/admin-panel/enterprise/new"}
          listEmptyMessage="No cuentas con empresas a tu cargo..."
          typeOfCard={CardType.EnterpriseCard}
          cardOnClick={handleCardClick}
          canCreateElement={true}
        />
      )}
    </>
  );
}
