"use client";

import { useEffect } from "react";

import { useEnterpriseContext } from "@contexts/Enterprise/context";
import enterpriseService from "@services/enterprises";
import { List } from "@components/index";
import { CardType } from "@/types";

export default function EnterpriseList(): JSX.Element {
  const { enterprises, setInitialEnterprises, isLoading } =
    useEnterpriseContext();

  useEffect(() => {
    const fetchEnterprises = async (): Promise<void> => {
      const list = await enterpriseService.getAll();
      setInitialEnterprises(list);
    };

    void fetchEnterprises();
  }, []);
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
        />
      )}
    </>
  );
}
