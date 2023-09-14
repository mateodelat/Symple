"use client";

import { useEnterpriseContext } from "@contexts/Enterprise/context";
import { CardEnterpriseEdit, List } from "@components/index";


export default function EnterpriseList(): JSX.Element {
  const { enterprises, isLoading } = useEnterpriseContext();
  return (
    <>
      {isLoading ? (
        <h2>Cargando empresas...</h2>
      ) : (
        <>
          
          <List
            list={enterprises}
            newElement="Nueva empresa"
            newElementPage={"/admin-panel/enterprise/new"}
            listEmptyMessage="No cuentas con empresas a tu cargo..."
            canCreateElement={true}
            Card={CardEnterpriseEdit}
          />
        </>
      )}
    </>
  );
}
